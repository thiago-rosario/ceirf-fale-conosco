const API_URL = '/api/messages'

const messageBody = document.getElementById('messageBody')
const template = document.getElementById('rowTemplate')
const totalCount = document.getElementById('totalCount')
const visibleCount = document.getElementById('visibleCount')
const statusLabel = document.getElementById('statusLabel')
const searchInput = document.getElementById('searchInput')
const refreshBtn = document.getElementById('refreshBtn')
const autoRefresh = document.getElementById('autoRefresh')

let messages = []
let refreshTimer = null

const setStatus = (text) => {
  statusLabel.textContent = text
}

const formatDate = (value) => {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  })
}

const formatProtocol = (id) => `CEIRF-${String(id).padStart(5, '0')}`

const renderRows = () => {
  const query = searchInput.value.trim().toLowerCase()
  const filtered = !query
    ? messages
    : messages.filter((item) => {
        const haystack = [
          item.name,
          item.force,
          item.post,
          item.contact,
          item.message,
          item.origin,
          item.status,
        ]
          .join(' ')
          .toLowerCase()
        return haystack.includes(query)
      })

  messageBody.innerHTML = ''
  filtered.forEach((item) => {
    const row = template.content.cloneNode(true)
    row.querySelector('[data-field="protocol"]').textContent = formatProtocol(item.id)
    row.querySelector('[data-field="created_at"]').textContent = formatDate(item.created_at)
    row.querySelector('[data-field="name"]').textContent = item.name
    row.querySelector('[data-field="force"]').textContent = item.force
    row.querySelector('[data-field="post"]').textContent = item.post
    row.querySelector('[data-field="contact"]').textContent = item.contact
    row.querySelector('[data-field="message"]').textContent = item.message
    row.querySelector('[data-field="status"]').textContent = item.status || '-'
    messageBody.appendChild(row)
  })

  visibleCount.textContent = filtered.length
}

const loadMessages = async () => {
  setStatus('Atualizando...')

  try {
    const response = await fetch(`${API_URL}?limit=300`)
    if (!response.ok) {
      throw new Error('Falha ao buscar')
    }

    const data = await response.json()
    if (!data.ok) {
      throw new Error('Resposta inválida')
    }

    messages = data.items || []
    totalCount.textContent = data.total ?? messages.length
    renderRows()
    setStatus('Online')
  } catch (error) {
    setStatus('Erro ao conectar')
  }
}

const startAutoRefresh = () => {
  if (refreshTimer) return
  refreshTimer = setInterval(loadMessages, 30000)
}

const stopAutoRefresh = () => {
  if (refreshTimer) {
    clearInterval(refreshTimer)
    refreshTimer = null
  }
}

searchInput.addEventListener('input', renderRows)
refreshBtn.addEventListener('click', loadMessages)
autoRefresh.addEventListener('change', (event) => {
  if (event.target.checked) {
    startAutoRefresh()
  } else {
    stopAutoRefresh()
  }
})

loadMessages()
