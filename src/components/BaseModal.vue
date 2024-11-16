<template>
  <dialog class="modal" open>
    <div class="modal__inner">
      <div class="modal__header">
        <span class="modal__title">{{ title }}</span>
        <BaseButton>
          <template #before>
            <BaseIcon name="close" />
          </template>
        </BaseButton>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import BaseIcon from './BaseIcon.vue'

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
}
</style>
