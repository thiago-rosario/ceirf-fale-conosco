import { API_URL } from './api.js'

const API_TOKEN = import.meta.env.VITE_API_TOKEN || 'ceirf-2026'
const REQUEST_TIMEOUT_MS = 12000

const normalize = (value) => (typeof value === 'string' ? value.trim() : '')

const buildPayload = ({ name, force, post, contact, message }) => ({
  name: normalize(name),
  force: normalize(force),
  post: normalize(post),
  contact: normalize(contact),
  message: normalize(message),
  origin: 'Carnaval 2026',
  token: API_TOKEN,
})

const parseResponse = async (response) => {
  const text = await response.text()
  if (!text) {
    return { ok: response.ok, data: null }
  }

  try {
    return { ok: response.ok, data: JSON.parse(text) }
  } catch (error) {
    return { ok: response.ok, data: { raw: text } }
  }
}

export const sendCarnavalForm = async (formData) => {
  const payload = buildPayload(formData)
  const controller = new AbortController()
  const timeoutId = globalThis.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Token': API_TOKEN,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })

    const { ok, data } = await parseResponse(response)

    if (!ok) {
      return { ok: false, error: data?.error || data?.message || 'Falha ao enviar.' }
    }

    if (data?.ok === false) {
      return { ok: false, error: data?.error || 'Falha ao enviar.' }
    }

    return { ok: true, data }
  } catch (error) {
    if (error?.name === 'AbortError') {
      return { ok: false, error: 'Tempo limite ao enviar. Tente novamente.' }
    }
    return { ok: false, error: 'Erro de conexão ao enviar. Tente novamente.' }
  } finally {
    globalThis.clearTimeout(timeoutId)
  }
}
