const normalizeBaseUrl = (value) => {
  if (typeof value !== 'string') return ''
  const trimmed = value.trim()
  if (!trimmed) return ''
  return trimmed.replace(/\/+$/, '')
}

const envBaseUrl = normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL)
const devBaseUrl = normalizeBaseUrl(import.meta.env.VITE_DEV_API_URL)
const fallbackBaseUrl = import.meta.env.DEV
  ? devBaseUrl || 'http://127.0.0.1:4001'
  : globalThis.location?.origin || ''

export const API_BASE_URL = envBaseUrl || normalizeBaseUrl(fallbackBaseUrl)
export const API_URL = `${API_BASE_URL}/api/messages`
