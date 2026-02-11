import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import Database from 'better-sqlite3'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dbPath = process.env.DB_PATH || path.join(__dirname, 'data', 'messages.db')
fs.mkdirSync(path.dirname(dbPath), { recursive: true })

const db = new Database(dbPath)

db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TEXT NOT NULL,
    name TEXT NOT NULL,
    force TEXT NOT NULL,
    post TEXT NOT NULL,
    contact TEXT NOT NULL,
    message TEXT NOT NULL,
    origin TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT ''
  );
`)

const insertStmt = db.prepare(`
  INSERT INTO messages (created_at, name, force, post, contact, message, origin, status)
  VALUES (@created_at, @name, @force, @post, @contact, @message, @origin, @status)
`)

const listStmt = db.prepare(`
  SELECT id, created_at, name, force, post, contact, message, origin, status
  FROM messages
  ORDER BY id DESC
  LIMIT @limit OFFSET @offset
`)

const countStmt = db.prepare('SELECT COUNT(1) as total FROM messages')

export const insertMessage = (payload) => {
  const info = insertStmt.run(payload)
  return info.lastInsertRowid
}

export const listMessages = ({ limit, offset }) => listStmt.all({ limit, offset })

export const countMessages = () => countStmt.get().total
