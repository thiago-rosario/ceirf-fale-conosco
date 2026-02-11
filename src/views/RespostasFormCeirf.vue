<template>
  <div class="responses-page" :style="{ '--carnaval-bg': `url(${backgroundImage})` }">
    <header class="hero">
      <div class="brand">
        <div class="logos">
          <img :src="logoSsp" alt="Logo da Secretaria da Segurança Pública" class="logo main" />
          <img :src="logoCeirf" alt="Logo da CEIRF" class="logo secondary" />
        </div>
        <div class="brand-text">
          <p class="eyebrow">Painel de mensagens · Carnaval 2026</p>
          <h1>Coordenação Executiva de Infraestrutura da Rede Física</h1>
          <p class="subtitle">
            Listagem das mensagens enviadas pelo formulário oficial. Atualize para acompanhar em
            tempo real.
          </p>
        </div>
      </div>

      <div class="hero-actions">
        <button class="btn primary" type="button" @click="loadMessages" :disabled="isLoading">
          {{ isLoading ? 'Atualizando...' : 'Atualizar agora' }}
        </button>
        <label class="toggle">
          <input v-model="autoRefresh" type="checkbox" />
          <span>Auto (30s)</span>
        </label>
      </div>
    </header>

    <section class="stats">
      <article class="stat">
        <span>Total de mensagens</span>
        <strong>{{ totalCount }}</strong>
      </article>
      <article class="stat">
        <span>Exibindo agora</span>
        <strong>{{ filteredMessages.length }}</strong>
      </article>
      <article class="stat">
        <span>Status</span>
        <strong :class="statusTone">{{ statusLabel }}</strong>
      </article>
    </section>

    <section class="filters">
      <input
        v-model="query"
        type="search"
        placeholder="Buscar por nome, contato, posto ou mensagem"
        aria-label="Buscar"
      />
      <select v-model="forceFilter" aria-label="Filtrar por força">
        <option value="">Todas as forças</option>
        <option v-for="force in forces" :key="force" :value="force">{{ force }}</option>
      </select>
    </section>

    <section class="table-section">
      <div v-if="errorMessage" class="empty-state error">
        <h2>Não foi possível carregar</h2>
        <p>{{ errorMessage }}</p>
        <button class="btn ghost" type="button" @click="loadMessages">Tentar novamente</button>
      </div>

      <div v-else-if="!isLoading && filteredMessages.length === 0" class="empty-state">
        <h2>Nenhuma mensagem encontrada</h2>
        <p>Assim que novas mensagens chegarem, elas aparecerão aqui.</p>
      </div>

      <div v-else class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Protocolo</th>
              <th>Data/Hora</th>
              <th>Nome</th>
              <th>Força</th>
              <th>Posto</th>
              <th>Contato</th>
              <th>Mensagem</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredMessages" :key="item.id">
              <td class="mono">{{ formatProtocol(item.id) }}</td>
              <td>{{ formatDate(item.created_at) }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.force }}</td>
              <td>{{ item.post }}</td>
              <td class="contact">{{ item.contact }}</td>
              <td class="message">{{ item.message }}</td>
              <td>
                <span class="status-badge" :class="item.status ? 'filled' : 'empty'">
                  {{ item.status || 'Pendente' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import '../Assets/respostas-ceirf.css'
import logoSsp from '../Assets/logo-ssp.png'
import logoCeirf from '../Assets/cc61f442-25b3-48aa-9391-f21a016dfcb9.png'
import backgroundImage from '../Assets/442a6baa-18f8-4ea2-aba8-11d002438c6c.png'
import { API_URL } from '../api.js'

const messages = ref([])
const totalCount = ref(0)
const isLoading = ref(false)
const errorMessage = ref('')
const statusLabel = ref('Pronto')
const statusTone = ref('status-ok')
const query = ref('')
const forceFilter = ref('')
const autoRefresh = ref(false)

let intervalId = null

const forces = computed(() => {
  const set = new Set(messages.value.map((item) => item.force).filter(Boolean))
  return Array.from(set)
})

const filteredMessages = computed(() => {
  const text = query.value.trim().toLowerCase()
  return messages.value.filter((item) => {
    const matchesForce = !forceFilter.value || item.force === forceFilter.value
    if (!matchesForce) return false
    if (!text) return true
    const haystack = [item.name, item.force, item.post, item.contact, item.message, item.status]
      .join(' ')
      .toLowerCase()
    return haystack.includes(text)
  })
})

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

const setStatus = (label, tone = 'status-ok') => {
  statusLabel.value = label
  statusTone.value = tone
}

const loadMessages = async () => {
  isLoading.value = true
  errorMessage.value = ''
  setStatus('Atualizando...', 'status-warn')

  try {
    const response = await fetch(`${API_URL}?limit=500`)
    if (!response.ok) {
      throw new Error('Falha ao buscar mensagens.')
    }

    const data = await response.json()
    if (!data.ok) {
      throw new Error('Resposta inválida da API.')
    }

    messages.value = data.items || []
    totalCount.value = data.total ?? messages.value.length
    setStatus('Online', 'status-ok')
  } catch (error) {
    errorMessage.value = error?.message || 'Erro de conexão ao buscar mensagens.'
    setStatus('Offline', 'status-error')
  } finally {
    isLoading.value = false
  }
}

const startAutoRefresh = () => {
  if (intervalId) return
  intervalId = window.setInterval(loadMessages, 30000)
}

const stopAutoRefresh = () => {
  if (intervalId) {
    window.clearInterval(intervalId)
    intervalId = null
  }
}

watch(autoRefresh, (value) => {
  if (value) {
    startAutoRefresh()
  } else {
    stopAutoRefresh()
  }
})

onMounted(() => {
  loadMessages()
})

onUnmounted(() => {
  stopAutoRefresh()
})
</script>
