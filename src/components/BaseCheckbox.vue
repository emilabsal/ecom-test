<template>
  <label class="checkbox">
    <div :class="boxClass">
      <input v-model="model" class="checkbox__input" type="checkbox" :value="value" hidden />
      <Transition>
        <BaseIcon v-if="model.includes(value)" class="checkbox__check" name="check" />
      </Transition>
    </div>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseIcon from './BaseIcon.vue'

const { value } = defineProps<{ value: string | number }>()

const boxClass = computed(() => [
  'checkbox__box',
  { checkbox__box_checked: model.value.includes(value) },
])

const model = defineModel<(string | number)[]>({
  required: true,
})
</script>

<style scoped lang="scss">
.checkbox {
  @include flex;

  &__box {
    position: relative;
    width: 28px;
    aspect-ratio: 1;
    background-color: #fff0ee;
    border: 3px solid $border;
    border-radius: 6px;
    box-shadow: 2px 2px 0 0 $border;

    &_checked {
      background-color: #f6a89e;
    }
  }

  &__check {
    position: absolute;
    top: 0;
    right: -2px;
    color: #f9f3e5;
  }
}
</style>
