<template>
  <div class="carnaval-page" :style="{ '--carnaval-bg': `url(${backgroundImage})` }">
    <div class="carnaval-backdrop" aria-hidden="true"></div>

    <!-- <img class="decor confete-top" :src="confeteImage" alt="" aria-hidden="true" />
    <img class="decor tambores" :src="tamboresImage" alt="" aria-hidden="true" />
    <img class="decor trio" :src="trioImage" alt="" aria-hidden="true" />
    <img class="decor mascarados" :src="mascaradosImage" alt="" aria-hidden="true" /> -->

    <header class="carnaval-hero">
      <div class="hero-badge">
        <img class="logo-main" :src="logoSsp" alt="Logo da Secretaria da Segurança Pública" />
        <div class="logo-stack">
          <!-- <img class="logo-secondary" :src="logoEstado" alt="Logo do Governo da Bahia" /> -->
          <span class="hero-tag">Contato Oficial</span>
        </div>
      </div>
      <div class="hero-text">
        <p class="eyebrow">Carnaval da Bahia 2026</p>
        <h1>Entre em contato com a CEIRF neste Carnaval</h1>
        <p class="subtitle">
          Atendimento rápido durante o Carnaval. Escolha um canal ou envie sua mensagem diretamente
          para nossa equipe.
        </p>
        <div class="hero-actions">
          <a class="hero-button primary" :href="whatsAppLink" target="_blank" rel="noopener"
            >Falar no WhatsApp</a
          >
          <a class="hero-button ghost" href="#mensagem-direta">Enviar mensagem</a>
        </div>
      </div>
    </header>

    <main class="carnaval-content">
      <section class="channels" aria-label="Canais de contato">
        <article class="channel-card">
          <div class="icon-wrap" aria-hidden="true">
            <svg viewBox="0 0 24 24" class="icon">
              <path
                d="M3 6.75A2.75 2.75 0 0 1 5.75 4h12.5A2.75 2.75 0 0 1 21 6.75v10.5A2.75 2.75 0 0 1 18.25 20H5.75A2.75 2.75 0 0 1 3 17.25z"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              />
              <path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.5" />
            </svg>
          </div>
          <h3>Email</h3>
          <p>{{ contact.email }}</p>
          <a class="card-button" :href="emailLink">Enviar e-mail</a>
        </article>

        <article class="channel-card highlight">
          <div class="icon-wrap" aria-hidden="true">
            <svg viewBox="0 0 24 24" class="icon">
              <path
                d="M12 3a9 9 0 0 0-7.71 13.63L3 21l4.51-1.16A9 9 0 1 0 12 3z"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
              <path
                d="M9.2 7.9c-.25-.6-.5-.61-.73-.62h-.63c-.22 0-.57.08-.86.38-.3.3-1.13 1.1-1.13 2.68s1.16 3.12 1.32 3.34c.16.22 2.23 3.54 5.48 4.82.76.3 1.35.48 1.8.61.76.24 1.45.2 2 .12.61-.09 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.13-.3-.22-.63-.38-.33-.16-1.9-.93-2.2-1.04-.3-.11-.52-.16-.74.16-.22.33-.85 1.04-1.04 1.26-.19.22-.38.25-.71.08-.33-.16-1.38-.5-2.62-1.6-.97-.87-1.63-1.95-1.82-2.28-.19-.33-.02-.5.14-.66.14-.14.33-.38.5-.57.16-.19.22-.33.33-.55.11-.22.05-.41-.03-.57-.08-.16-.69-1.7-.95-2.3z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h3>WhatsApp</h3>
          <p>{{ contact.whatsappDisplay }}</p>
          <a class="card-button" :href="whatsAppLink" target="_blank" rel="noopener"
            >Enviar mensagem</a
          >
        </article>

        <article class="channel-card">
          <div class="icon-wrap" aria-hidden="true">
            <svg viewBox="0 0 24 24" class="icon">
              <path
                d="M4.5 5.5a2 2 0 0 1 2-2h2l1 4-2 1a12 12 0 0 0 5 5l1-2 4 1v2a2 2 0 0 1-2 2h-1c-6 0-11-5-11-11z"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <h3>Telefone</h3>
          <p>{{ contact.phoneDisplay }}</p>
          <a class="card-button" :href="phoneLink">Ligar agora</a>
        </article>
      </section>

      <section id="mensagem-direta" class="direct-message" aria-label="Mensagem direta">
        <div class="direct-text">
          <h2>Ou envie-nos uma mensagem direta</h2>
          <p>
            Atendimento dedicado durante todo o Carnaval. Preencha os dados e retornaremos o mais
            breve possível.
          </p>
          <div class="direct-pill">Resposta em horário estendido</div>
        </div>
        <p class="form-note">
          Para facilitar o acompanhamento da sua solicitação, por favor informe um meio de contato
          para retorno.
        </p>
        <p v-if="statusMessage" class="form-alert" :class="statusTone" role="status" aria-live="polite">
          {{ statusMessage }}
        </p>
        <form ref="formRef" class="direct-form" @submit.prevent="handleSubmit">
          <label>
            <span>Digite seu nome</span>
            <input
              v-model="form.name"
              type="text"
              name="name"
              autocomplete="name"
              placeholder="Digite seu nome completo"
              required
            />
          </label>
          <label>
            <span>Força</span>
            <select v-model="form.force" name="force" required>
              <option value="" disabled>Selecione</option>
              <option v-for="force in forces" :key="force.value" :value="force.value">
                {{ force.label }}
              </option>
            </select>
          </label>
          <label>
            <span>Buscar posto</span>
            <input
              v-model="postSearch"
              type="search"
              name="post_search"
              autocomplete="off"
              placeholder="Digite para filtrar os postos"
            />
          </label>
          <label>
            <span>Posto</span>
            <select v-model="form.post" name="post" required>
              <option value="" disabled>Selecione o posto</option>
              <option v-for="post in filteredPosts" :key="post" :value="post">
                {{ post }}
              </option>
            </select>
          </label>
          <label class="full">
            <span>Contato para retorno</span>
            <input
              v-model="form.contact"
              type="text"
              name="contact"
              autocomplete="tel"
              placeholder="Ex.: (71) 99999-9999 ou seu@email.com"
              required
            />
          </label>
          <label class="full">
            <span>Sua mensagem</span>
            <textarea
              v-model="form.message"
              rows="5"
              name="message"
              placeholder="Descreva como podemos ajudar"
              required
            ></textarea>
          </label>
          <button class="submit" type="submit" :disabled="isSubmitting" :aria-busy="isSubmitting">
            {{ isSubmitting ? 'Enviando...' : 'Enviar mensagem' }}
          </button>
        </form>
      </section>
    </main>

    <footer class="carnaval-footer">
      <div class="footer-note">
        <p>
          Elogios ou solicitações? Como podemos melhorar? Queremos ouvir você — envie seu feedback à
          CEIRF.
        </p>
      </div>
      <div class="footer-grid">
        <img class="footer-logo" :src="logoCeirf" alt="Logo da CEIRF" />
        <div class="footer-text">
          <p class="footer-title">CEIRF - Coordenação Executiva de Infraestrutura da Rede Física</p>
          <p>Secretaria da Segurança Pública - Governo da Bahia</p>
        </div>
        <img class="footer-logo secondary" :src="logoSsp" alt="Logo da SSP" />
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { sendCarnavalForm } from '../server.js'
import '../Assets/contato-carnaval.css'
import logoSsp from '../Assets/Sem Título.png'
import logoCeirf from '../Assets/cc61f442-25b3-48aa-9391-f21a016dfcb9.png'
import backgroundImage from '../Assets/442a6baa-18f8-4ea2-aba8-11d002438c6c.png'
// import logoEstado from '../Assets/Logo-estado.png'
// import confeteImage from '../Assets/Confetes_sepertina.png'
// import mascaradosImage from '../Assets/Mascarados.png'
// import tamboresImage from '../Assets/Tambores.png'
// import trioImage from '../Assets/Trio_eletrico.png'

const contact = {
  email: 'ceirf.gabinete@ssp.ba.gov.br',
  whatsappDisplay: '(71) 99923-2647',
  whatsappE164: '5571999232647',
  phoneDisplay: '(71) 3115-1809',
  phoneE164: '+557131151809',
}

const emailLink = `mailto:${contact.email}`
const whatsAppLink = `https://wa.me/${contact.whatsappE164}`
const phoneLink = `tel:${contact.phoneE164}`

const formRef = ref(null)
const statusMessage = ref('')
const statusTone = ref('success')
const isSubmitting = ref(false)
const postSearch = ref('')
const form = reactive({
  name: '',
  force: '',
  post: '',
  contact: '',
  message: '',
})

let statusTimeoutId = 0

const showStatus = (tone, message) => {
  statusTone.value = tone
  statusMessage.value = message
  if (statusTimeoutId) {
    globalThis.clearTimeout(statusTimeoutId)
  }
  statusTimeoutId = globalThis.setTimeout(() => {
    statusMessage.value = ''
  }, 4000)
}

const forces = [
  { value: 'PM', label: 'PM' },
  { value: 'PC', label: 'PC' },
  { value: 'DPT', label: 'DPT' },
  { value: 'BM', label: 'BM' },
  { value: 'SSP', label: 'SSP' },
]

const posts = [
  'ASCOM – Sabino Silva',
  'Central de Flagrantes',
  'DEA – PCBA – Airosa Galvão',
  'DPT – Milton Santos',
  'DPT – Passeio Público',
  'DPT – Sabino Silva',
  'PCBA – Milton Santos',
  'PCBA – Passeio Público',
  'PCBA DEAM – Milton Santos',
  'PCBA DEAM – Passeio Público',
  'PCBA DEAM – Shopping Barra',
  'PCBA DEAM Servir – Ladeira da Montanha',
  'PCBA – Proteger – Alfredo Magalhães',
  'PCBA – Proteger – Piedade',
  'PCBA – Proteger – Vitória Center',
  'PCT PCBA – Barris',
  'PMBA – Campo Grande',
  'PMBA – Passeio Público',
  'PMBA – TCA / FUNCEB',
  'PMBA – PCBA – Campo Grande',
  'PMBA – PCBA – Gabinete Português',
  'POPC – Avenida Oceânica',
  'PPI – PMBA – PCBA – Avenida Oceânica',
  'PPI – PMBA – PCBA – Gameleira',
  'PPI – PMBA – PCBA – Marques de Leão',
  'PPI – PMBA – PCBA – Mirante dos Aflitos',
  'PPI – PMBA – PCBA – Sabino Silva',
  'PPI – PMBA – PCBA – São Bento',
  'PPI – PMBA – PCBA – Shopping Barra',
  'PPI CF – Piedade',
  'SEAP – Barris',
  'SPM – Câmara de Vereadores',
  'SPRV PI – Praça Municipal',
  'SSP – POSSP – Sabino Silva',
  'STELECOM – PCBA – Milton Santos',
]

const filteredPosts = computed(() => {
  const query = postSearch.value.trim().toLowerCase()
  if (!query) {
    return posts
  }
  return posts.filter((post) => post.toLowerCase().includes(query))
})

const handleSubmit = async () => {
  const formEl = formRef.value
  if (!formEl || !formEl.reportValidity() || isSubmitting.value) {
    return
  }

  const payload = {
    name: form.name.trim(),
    force: form.force.trim(),
    post: form.post.trim(),
    contact: form.contact.trim(),
    message: form.message.trim(),
  }

  if (!payload.name || !payload.force || !payload.post || !payload.contact || !payload.message) {
    showStatus('error', 'Preencha todos os campos obrigatórios.')
    return
  }

  isSubmitting.value = true
  const result = await sendCarnavalForm(payload)
  isSubmitting.value = false

  if (!result.ok) {
    showStatus('error', result.error || 'Erro ao enviar. Tente novamente.')
    return
  }

  showStatus('success', 'Mensagem enviada com sucesso ✅')
  form.name = ''
  form.force = ''
  form.post = ''
  form.contact = ''
  form.message = ''
  postSearch.value = ''
}
</script>
