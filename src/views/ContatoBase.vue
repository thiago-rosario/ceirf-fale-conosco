<template>
  <div class="app" :style="{ '--background-image': `url(${backgroundImage})` }">
    <div class="backdrop" aria-hidden="true"></div>

    <header class="hero">
      <div class="brand">
        <img class="brand-logo" :src="logoSsp" alt="Logo da SSP" />
        <div class="brand-text">
          <p class="eyebrow">Secretaria da Seguranca Publica</p>
          <h1>Fale Com A CEIRF nesse carnaval</h1>
          <p class="subtitle">
            Estamos aqui para ajudar. Escolha uma das opcoes abaixo para falar conosco.
          </p>
        </div>
      </div>
    </header>

    <main class="content">
      <section class="cards" aria-label="Canais de contato">
        <article class="card">
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
          <p>atendimento@ssp.ba.gov.br</p>
          <a class="primary" :href="emailLink">Enviar email</a>
        </article>

        <article class="card">
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
          <p>(71) 99999-9999</p>
          <a class="primary" :href="whatsAppLink" target="_blank" rel="noopener">Enviar mensagem</a>
        </article>

        <article class="card">
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
          <p>(71) 3300-0000</p>
          <a class="primary" :href="phoneLink">Ligar agora</a>
        </article>
      </section>

      <section class="form-area" aria-label="Mensagem direta">
        <div class="form-header">
          <h2>Ou envie-nos uma mensagem diretamente</h2>
          <p>Responderemos o mais breve possivel.</p>
        </div>
        <form class="form">
          <label>
            <span>Seu nome</span>
            <input type="text" placeholder="Digite seu nome" />
          </label>
          <label>
            <span>Seu email</span>
            <input type="email" placeholder="seuemail@exemplo.com" />
          </label>
          <label class="full">
            <span>Sua mensagem</span>
            <textarea rows="4" placeholder="Escreva como podemos ajudar"></textarea>
          </label>
          <button class="cta" type="button">Enviar mensagem</button>
        </form>
      </section>
    </main>

    <footer class="footer">
      <div class="footer-wrap">
        <img class="footer-logo" :src="logoCeirf" alt="Logo da CEIRF" />
        <div class="footer-text">
          <p>CEIRF - Coordenacao Executiva de Infraestrutura</p>
          <p>Secretaria da Seguranca Publica - Governo da Bahia</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import '../Assets/app.css'
import logoSsp from '../Assets/Sem Título.png'
import backgroundImage from '../Assets/442a6baa-18f8-4ea2-aba8-11d002438c6c.png'
import logoCeirf from '../Assets/cc61f442-25b3-48aa-9391-f21a016dfcb9.png'

const emailLink = 'mailto:atendimento@ssp.ba.gov.br'
const whatsAppLink = 'https://wa.me/5571999999999'
const phoneLink = 'tel:+557133000000'
</script>
