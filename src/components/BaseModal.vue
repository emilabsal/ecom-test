<template>
  <dialog
    class="modal"
    open
    @click.self="$emit('close')"
  >
    <div class="modal__inner">
      <div class="modal__header">
        <span class="modal__title">{{ title }}</span>
        <BaseButton
          class="modal__close"
          design="error"
          size="large"
          circle
          @click="$emit('close')"
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
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  inset: 0;
  z-index: 1;
  height: 100svh;
  width: 100%;
  background-color: rgba($border, 0.1);
  @include flex($ai: start);

  &__inner {
    max-width: 600px;
    width: 100%;
    background-color: $bg-card;
    border: 4px solid $border;
    border-radius: 16px;
    box-shadow: 12px 12px 0 0 $border;
    margin-top: 100px;
  }

  &__header {
    @include flex($jc: space-between);
    padding: 16px;
    width: 100%;
    position: relative;
    border-bottom: 4px solid $border;
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
