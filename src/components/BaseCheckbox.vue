<template>
  <label class="checkbox">
    <div :class="boxClass">
      <input
        v-model="model"
        class="checkbox__input"
        type="checkbox"
        hidden
      />
      <BaseIcon
        v-if="model"
        class="checkbox__check"
        name="check"
      />
    </div>
    <span class="checkbox__label">{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Checkbox } from '@/types/checkbox'
import BaseIcon from './BaseIcon.vue'

const { label } = defineProps<Checkbox.Props>()

const boxClass = computed(() => ['checkbox__box', { checkbox__box_checked: model.value }])

const model = defineModel<boolean>({
  required: true
})
</script>

<style scoped lang="scss">
.checkbox {
  @include flex;
  gap: 16px;

  &__box {
    position: relative;
    width: 28px;
    aspect-ratio: 1 / 1;
    background-color: $neutral-light;
    border: 3px solid $black;
    border-radius: 6px;
    box-shadow: 2px 2px 0 0 $black;

    &_checked {
      background-color: $negative;
    }
  }

  &__check {
    position: absolute;
    top: 0;
    right: -2px;
    color: $neutral-light;
  }

  &__label {
    font-size: 20px;
    font-weight: 400;
    line-height: 120%;
    user-select: none;
  }
}
</style>
