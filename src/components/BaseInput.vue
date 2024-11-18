<template>
  <div class="input-wrapper">
    <label class="input">
      <input
        v-model="model"
        v-bind="$attrs"
        class="input__field"
        type="text"
      />
    </label>
    <p
      v-if="validator"
      class="input__error"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const { validator = false } = defineProps<{ validator?: boolean }>()

const model = defineModel<string>({
  required: true
})

const emit = defineEmits<{
  (e: 'is-error', value: boolean): void
}>()

const errorMessage = ref('')

function getError(value: string) {
  if (!value) return 'Поле обязательно для заполнения'
  if (value.length < 3 || value.length > 50) return 'Длина должна быть от 3 до 50 символов'

  return ''
}

watch(model, (value) => {
  errorMessage.value = getError(value)
  const isError = errorMessage.value ? true : false

  emit('is-error', isError)
})
</script>

<style scoped lang="scss">
.input {
  border: 2px solid $black;
  border-radius: 8px;
  box-shadow: 2px 2px 0 0 $black;
  padding: 8px 12px;
  @include flex;
  width: 100%;

  &__field {
    font-size: 20px;
    line-height: 120%;
    font-weight: 500;
    flex-grow: 1;
  }

  &__error {
    margin-top: 8px;
    font-size: 16px;
    font-weight: 400;
    line-height: 120%;
    color: $negative;
  }
}
</style>
