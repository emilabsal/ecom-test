<template>
  <component :is="component">
    <RouterView />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'

const route = useRoute()

const component = computed(() => {
  return route.meta.layout
})
</script>
