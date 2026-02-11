<template>
  <component :is="currentView" />
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import ContatoCarnaval from './views/ContatoCarnaval.vue'
import RespostasFormCeirf from './views/RespostasFormCeirf.vue'

const currentPath = ref(window.location.pathname)

const currentView = computed(() => {
  if (currentPath.value === '/contato/carnaval') {
    return ContatoCarnaval
  }
  if (currentPath.value === '/contato/respostas' || currentPath.value === '/respostas') {
    return RespostasFormCeirf
  }
  return ContatoCarnaval
})

const handlePopState = () => {
  currentPath.value = window.location.pathname
}

onMounted(() => {
  window.addEventListener('popstate', handlePopState)
})

onUnmounted(() => {
  window.removeEventListener('popstate', handlePopState)
})
</script>
