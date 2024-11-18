<template>
  <dialog
    class="modal"
    open
    @click.self="onClose"
  >
    <div class="modal__inner">
      <div class="modal__header">
        <span class="modal__title">{{ title }}</span>
        <BaseButton
          class="modal__close"
          design="negative"
          size="large"
          circle
          @click="onClose"
        >
          <BaseIcon name="close" />
        </BaseButton>
      </div>
      <div class="modal__body">
        <slot></slot>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import BaseIcon from './BaseIcon.vue'
import BaseButton from './BaseButton.vue'

const { title } = defineProps<{ title: string }>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

function onClose() {
  document.body.classList.remove('scroll-lock')
  emit('close')
}
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  inset: 0;
  z-index: 1;
  height: 100svh;
  width: 100%;
  background-color: rgba($black, 0.5);
  @include flex($ai: start);

  &__inner {
    background-color: $neutral-light;
    border: 4px solid $black;
    border-radius: 16px;
    box-shadow: 12px 12px 0 0 $black;
    margin-top: 100px;
    max-width: 600px;
    width: 100%;
  }

  &__header {
    @include flex($jc: space-between);
    padding: 16px;
    width: 100%;
    position: relative;
    border-bottom: 4px solid $black;
  }

  &__body {
    padding: 16px;
  }

  &__title {
    font-size: 30px;
    line-height: 120%;
    font-weight: 600;
  }

  &__close {
    position: absolute;
    top: -18px;
    right: -18px;
  }
}
</style>
