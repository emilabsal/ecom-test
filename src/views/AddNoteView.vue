<template>
  <div class="add-note">
    <BaseCard
      class="add-note__card"
      title="Создать заметку"
    >
      <form
        class="add-note-form"
        @submit.prevent="onSubmit"
      >
        <BaseInput
          v-model="name"
          @is-error="(value) => (isError = value)"
        />
        <div class="add-note-form__controls">
          <BaseCheckbox
            v-model="done"
            value="done"
            label="Отметить как выполнено"
          />
          <BaseButton
            label="Создать"
            design="positive"
            size="large"
            :disabled="isError"
            full-width
          />
        </div>
      </form>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseCard from '@/components/BaseCard.vue'
import BaseCheckbox from '@/components/BaseCheckbox.vue'
import BaseButton from '@/components/BaseButton.vue'
import { useRouter } from 'vue-router'
import { useNotes } from '@/composables/useNotes'

const name = ref('')
const done = ref([])
const router = useRouter()
const notesComposable = useNotes()
const isError = ref(true)

async function onSubmit() {
  if (!name.value) return

  notesComposable.addNote(name.value)
  router.push('/')
}
</script>

<style scoped lang="scss">
.add-note {
  width: 100%;
  @include flex;
}

.add-note-form {
  @include flex($fd: column, $ai: stretch);
  width: 100%;

  &__controls {
    margin-top: 24px;
    @include flex($fd: column, $ai: flex-start);
    gap: 16px;
  }
}
</style>
