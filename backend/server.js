import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { insertMessage, listMessages, countMessages } from './db.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

const PORT = Number(process.env.PORT || 3001)
const API_TOKEN = process.env.API_TOKEN || 'ceirf-2026'
const ADMIN_USER = process.env.ADMIN_USER || ''
const ADMIN_PASS = process.env.ADMIN_PASS || ''

app.use(express.json({ limit: '32kb' }))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Api-Token')

  if (req.method === 'OPTIONS') {
    res.status(204).end()
    return
  }

  next()
})

const requireToken = (req, res, next) => {
  if (!API_TOKEN) return next()

  const token = req.get('x-api-token') || req.body?.token || ''
  if (token !== API_TOKEN) {
    res.status(401).json({ ok: false, error: 'unauthorized' })
    return
  }
  next()
}

const requireAdminAuth = (req, res, next) => {
  if (!ADMIN_USER || !ADMIN_PASS) return next()

  const header = req.get('authorization') || ''
  const [scheme, encoded] = header.split(' ')
  if (scheme !== 'Basic' || !encoded) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Admin"')
    res.status(401).end('Auth required')
    return
  }

  const decoded = Buffer.from(encoded, 'base64').toString('utf-8')
  const [user, pass] = decoded.split(':')
  if (user !== ADMIN_USER || pass !== ADMIN_PASS) {
    res.status(403).end('Forbidden')
    return
  }

  next()
}

const sanitize = (value, max) => {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, max)
}

app.post('/api/messages', requireToken, (req, res) => {
  const payload = {
    name: sanitize(req.body?.name, 120),
    force: sanitize(req.body?.force, 80),
    post: sanitize(req.body?.post, 140),
    contact: sanitize(req.body?.contact, 140),
    message: sanitize(req.body?.message, 2000),
    origin: sanitize(req.body?.origin, 60) || 'Carnaval 2026',
    status: '',
  }

  const missing = Object.entries(payload)
    .filter(([key, value]) => key !== 'status' && !value)
    .map(([key]) => key)

  if (missing.length > 0) {
    res.status(400).json({ ok: false, error: `missing:${missing.join(',')}` })
    return
  }

  const createdAt = new Date().toISOString()
  const id = insertMessage({ ...payload, created_at: createdAt })

  res.json({ ok: true, id })
})

app.get('/api/messages', requireAdminAuth, (req, res) => {
  const limit = Math.min(Number(req.query.limit || 200), 500)
  const offset = Math.max(Number(req.query.offset || 0), 0)

  const items = listMessages({ limit, offset })
  const total = countMessages()

  res.json({ ok: true, total, items, limit, offset })
})

app.get('/api/health', (req, res) => {
  res.json({ ok: true })
})

const publicDir = path.join(__dirname, 'public')
app.use('/admin', requireAdminAuth, express.static(publicDir))
app.use(express.static(publicDir))

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`)
})
