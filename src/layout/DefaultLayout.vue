<template>
  <div class="default-layout">
    <main class="default-layout__main">
      <slot></slot>
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import TheFooter from '@/components/TheFooter.vue'
</script>

<style scoped lang="scss">
.default-layout {
  @include flex($fd: column, $ai: stretch);
  width: 100%;
  min-height: 100svh;

  &__main {
    flex-grow: 1;
    padding: 24px;
  }
}
</style>
