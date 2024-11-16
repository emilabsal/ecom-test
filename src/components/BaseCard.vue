<template>
  <div class="card">
    <div class="card__header">
      <span class="card__title">{{ title }}</span>
    </div>
    <div class="card__body">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Card } from '@/types/card'

const { title } = defineProps<Card.Props>()
</script>

<style scoped lang="scss">
.card {
  background-color: $bg-card;
  border-radius: 24px;
  border: 4px solid $border;
  box-shadow: 12px 12px 0 0 $border;
  overflow: hidden;

  &__header {
    border-bottom: 4px solid $border;
    padding: 24px 16px;
    width: 100%;
    @include flex;
  }

  &__title {
    font-size: 36px;
    line-height: 120%;
    font-weight: 600;
  }

  &__body {
    overflow: hidden;
  }
}
</style>
