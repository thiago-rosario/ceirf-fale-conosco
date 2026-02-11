<script setup>
import VueQrcode from 'vue-qrcode'

const siteUrl = new URL('/', window.location.origin).toString()
</script>

<template>
  <div class="qr-wrapper">
    <h3>Acesse o Fale Conosco</h3>

    <VueQrcode :value="siteUrl" :width="220" />

    <p>Escaneie o QR Code</p>
  </div>
</template>

<style scoped>
.qr-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}
</style>
