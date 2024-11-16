<template>
  <span class="icon" v-html="svg"></span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Icon } from '@/types/icon'

const { name } = defineProps<Icon.Props>()

const modules = import.meta.glob('../assets/icons/**/*.svg', {
  as: 'raw',
  eager: true,
})

const svg = computed(() => {
  return modules['../assets/icons/' + name + '.svg']
})
</script>

<style scoped lang="scss">
.icon {
  line-height: 0;
}

.icon svg {
  width: 1em;
  height: 1em;
  vertical-align: middle;
}

.icon.icon * {
  stroke: currentColor;
}
</style>
