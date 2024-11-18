<template>
  <div class="notes-list-id">
    <BaseButton
      class="notes-list-id__back"
      label="Назад"
      @click="$router.go(-1)"
    />
    <BaseCard :title="note!.name">
      <p class="notes-list-id__status">
        Статус выполнения:
        <span class="notes-list-id__status notes-list-id__status_bold">{{ status }}</span>
      </p>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseCard from '@/components/BaseCard.vue'
import { useNotesStore } from '@/stores/notes'
import { storeToRefs } from 'pinia'
import type { Note } from '@/types/note'
import { useRoute } from 'vue-router'

const store = useNotesStore()
const { notes } = storeToRefs(store)
const route = useRoute()

const note = computed(() =>
  notes.value.find(
    (note: Note.Item) => note.name === (route.params.name as string).replace(/-/g, ' ')
  )
)

const status = computed(() => (note.value?.checkbox ? 'Выполнено' : 'Не выполнено'))
</script>

<style scoped lang="scss">
.notes-list-id {
  @include flex;
  width: 100%;

  &__back {
    position: absolute;
    top: 24px;
    left: 24px;
  }

  &__status {
    @extend .text-24;

    &_bold {
      @extend .text-bold;
    }
  }
}
</style>
