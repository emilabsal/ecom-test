<template>
  <button :class="buttonClass">
    <slot name="before"></slot>
    <slot></slot>
    {{ label }}
    <slot name="after"></slot>
  </button>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { Button } from '@/types/button'

const {
  label,
  design = 'default',
  size = 'small',
  fullWidth = false,
  circle
} = defineProps<Button.Props>()

const attrs = useAttrs()

const buttonClass = computed(() => [
  'button',
  `button_${size}`,
  `button_${design}`,
  { button_circle: circle },
  { button_full: fullWidth },
  { button_disabled: attrs.disabled }
])
</script>

<style scoped lang="scss">
.button {
  @include flex;
  cursor: pointer;
  white-space: nowrap;
  transition: $transition;
  border-radius: 8px;
  box-shadow: 2px 2px 0 0 $black;
  border: 2px solid $black;

  &_default {
    background-color: $neutral-light;

    &:not(.button_disabled) {
      &:hover,
      &:focus-visible {
        background-color: $neutral;
      }

      &:active {
        box-shadow: 1px 1px 0 0 $black;
      }
    }
  }

  &_positive {
    background-color: $positive-light;

    &:not(.button_disabled) {
      &:hover,
      &:focus-visible {
        background-color: $positive;
      }

      &:active {
        box-shadow: 1px 1px 0 0 $black;
      }
    }
  }

  &_negative {
    background-color: $negative-light;

    &:not(.button_disabled) {
      &:hover,
      &:focus-visible {
        background-color: $negative;
      }

      &:active {
        box-shadow: 1px 1px 0 0 $black;
      }
    }
  }

  &_small {
    height: 36px;
    @extend .text-18;
    padding-inline: 12px;
  }

  &_medium {
    height: 40px;
    @extend .text-20;
    padding-inline: 12px;
  }

  &_large {
    height: 44px;
    @extend .text-20;
    padding-inline: 12px;
  }

  &_circle {
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    padding: initial;
  }

  &_full {
    width: 100%;
  }

  &_disabled {
    opacity: 0.5;
    cursor: default;
  }
}
</style>
