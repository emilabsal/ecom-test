<template>
  <label class="input">
    <input
      class="input__field"
      type="text"
      v-model="model"
    />
  </label>
</template>

<script setup lang="ts">
const model = defineModel<string | number>({
  required: true,
})
</script>

<style scoped lang="scss">
.input {
  border: 2px solid $border;
  border-radius: 8px;
  box-shadow: 2px 2px 0 0 $border;
  padding: 8px 12px;
  @include flex;
  width: 100%;

  &__field {
    font-size: 20px;
    line-height: 120%;
    font-weight: 500;
    flex-grow: 1;
  }
}
</style>
