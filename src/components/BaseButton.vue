<template>
  <button class="button">
    <slot name="before"></slot>
    {{ label }}
    <slot name="after"></slot>
  </button>
</template>

<script setup lang="ts">
const { label } = defineProps<{ label: string }>()
</script>

<style scoped lang="scss">
.button {
  padding: 4px 12px;
  background-color: white;
  border: 3px solid $border;
  border-radius: 8px;
  box-shadow: 2px 2px 0 0 $border;
  font-size: 16px;
  font-weight: 300;
  height: 28px;
  @include flex;
  white-space: nowrap;
  transition: $transition;

  &:hover {
    background-color: #d0f4f0;
  }
  &:active,
  &:focus-visible {
    background-color: #8cd4cb;
  }
}
</style>
