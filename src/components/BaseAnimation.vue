<template>
  <TransitionGroup
    v-if="group"
    :name="name"
  >
    <slot></slot>
  </TransitionGroup>
  <Transition
    v-else
    :name="name"
  >
    <slot></slot>
  </Transition>
</template>

<script setup lang="ts">
import type { Animation } from '@/types/animation'

const { group = false, name = 'fade' } = defineProps<Animation.Props>()
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: $transition ease;
  scale: 2;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  scale: 1;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 0;
  scale: 1;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.5s ease;
}
.slide-right-enter-from,
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
