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

  &_full {
    width: 100%;
  }

  &_disabled {
    opacity: 0.5;
    cursor: default;
  }

  &_default {
    background-color: #f9f3e5;
    border: 2px solid $border;
    padding-inline: 12px;
    border-radius: 8px;
    box-shadow: 2px 2px 0 0 $border;
    font-size: 18px;
    line-height: 120%;
    font-weight: 300;

    &:not(.button_disabled) {
      &:hover,
      &:focus-visible {
        background-color: $neutral;
      }

      &:active {
        box-shadow: 1px 1px 0 0 $border;
      }
    }
  }

  &_positive {
    background-color: #8cd4cb;
    border: 2px solid $border;
    padding-inline: 12px;
    border-radius: 8px;
    box-shadow: 2px 2px 0 0 $border;
    font-size: 18px;
    line-height: 120%;
    font-weight: 400;
    letter-spacing: 0.02em;
    background-color: $positive-light;

    &:not(.button_disabled) {
      &:hover,
      &:focus-visible {
        background-color: $positive;
      }

      &:active {
        box-shadow: 1px 1px 0 0 $border;
      }
    }
  }

  &_error {
    background-color: #f6a89e;
    border: 2px solid $border;
    padding-inline: 12px;

    &:hover {
      background-color: #fff0ee;
    }

    &:active,
    &:focus-visible {
      background-color: darken(#f6a89e, 20%);
    }
  }

  &_small {
    height: 36px;
    white-space: nowrap;
  }

  &_medium {
    height: 40px;
    white-space: nowrap;
  }

  &_large {
    height: 44px;
    font-size: 20px;
  }

  &_circle {
    aspect-ratio: 1;
    border-radius: 50%;
    padding: initial;
  }
}
</style>
