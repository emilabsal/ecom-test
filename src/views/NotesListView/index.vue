<template>
  <div class="notes-list">
    <BaseCard
      class="notes"
      title="Список заметок"
    >
      <p
        v-if="isLoading"
        class="notes__loading"
      >
        Loading...
      </p>
      <BaseTable
        v-else
        :columns="table.columns"
        :columns-scheme="table.columnsScheme"
        :rows="table.rows"
      >
        <template #check="{ row }">
          <BaseCheckbox v-model="row.checkbox" />
        </template>
        <template #number="{ row }">
          {{ row.id + 1 }}
        </template>
        <template #name="{ row }">
          {{ row.name }}
        </template>
        <template #buttons="{ row }">
          <div class="notes__buttons">
            <BaseButton
              label="Редактировать"
              @click="openModal(row)"
            />
            <BaseButton
              label="Удалить"
              @click="openDeleteModal(row)"
            />
          </div>
        </template>
        <template #link="{ row }">
          <RouterLink
            class="notes__text"
            :to="{
              name: 'name',
              params: { id: row.id, name: row.name.replace(/\s/g, '-') }
            }"
            >Подробнее</RouterLink
          >
        </template>
      </BaseTable>
    </BaseCard>

    <!-- modals -->
    <!-- edit -->
    <BaseModal
      class="notes-edit"
      v-if="isShowModal"
      title="Редактировать"
      @close="onEditCloseModal"
    >
      <div class="notes-edit__body">
        <BaseInput v-model="data.modelName" />
        <div class="notes-edit__buttons">
          <BaseButton
            class="notes-edit__button"
            label="Отмена"
            size="large"
            @click="onEditCloseModal"
          />
          <BaseButton
            class="notes-edit__button"
            label="Сохранить"
            design="positive"
            size="large"
            @click="onEditSaveModal"
          />
        </div>
      </div>
    </BaseModal>
    <!-- delete -->
    <BaseModal
      v-if="isShowDeleteModal"
      class="notes-delete"
      title="Удалить"
      @close="isShowDeleteModal = false"
    >
      <div class="notes-delete__buttons">
        <BaseButton
          class="notes-delete__button"
          label="Отмена"
          size="large"
          @click="onDeleteCloseModal"
        />
        <BaseButton
          class="notes-delete__button"
          label="Удалить"
          design="positive"
          size="large"
          @click="onDelete"
        />
      </div>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseTable from '@/components/BaseTable.vue'
import BaseCard from '@/components/BaseCard.vue'
import BaseCheckbox from '@/components/BaseCheckbox.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseModal from '@/components/BaseModal.vue'
import BaseInput from '@/components/BaseInput.vue'
import { useNotesStore } from '@/stores/notes'
import { useNotes } from '@/composables/useNotes'
import type { Note } from '@/types/note'
import { storeToRefs } from 'pinia'
import type { Table } from '@/types/table'

const store = useNotesStore()
const { notes } = storeToRefs(store)

const { isLoading } = useNotes()

const table = computed(() => {
  return {
    columns: [
      { id: 'number', label: 'Номер', position: 'center' },
      { id: 'name', label: 'Наименование' },
      { id: 'buttons' },
      { id: 'link', label: 'Ссылка' }
    ] as Table.Column[],
    columnsScheme: ['auto', 'min-content', 'auto', 'max-content', 'auto'],
    rows: store.notes
  }
})
// edit modal
const isShowModal = ref(false)
const data = ref()

function openModal(row: Note.Item) {
  isShowModal.value = true
  document.body.classList.add('scroll-lock')

  data.value = {
    id: row.id,
    modelName: row.modelName
  }
}

function onEditCloseModal() {
  isShowModal.value = false
  notes.value.find((note: Note.Item) => note.id === data.value.id)!.modelName = data.value.modelName
  document.body.classList.remove('scroll-lock')
}

function onEditSaveModal() {
  isShowModal.value = false
  store.notes.find((note: Note.Item) => note.id === data.value.id)!.modelName = data.value.modelName
  store.notes.find((note: Note.Item) => note.id === data.value.id)!.name = data.value.modelName
  document.body.classList.remove('scroll-lock')
}

// delete modal
const isShowDeleteModal = ref(false)
const deletedNote = ref()

function openDeleteModal(row: Note.Item) {
  isShowDeleteModal.value = true
  deletedNote.value = row
  document.body.classList.add('scroll-lock')
}

function onDeleteCloseModal() {
  isShowDeleteModal.value = false
  document.body.classList.remove('scroll-lock')
}

function onDelete() {
  isShowDeleteModal.value = false
  store.notes = store.notes.filter((note: Note.Item) => note.id !== deletedNote.value.id)
  deletedNote.value = null
  document.body.classList.remove('scroll-lock')
}
</script>

<style scoped lang="scss">
.notes-list {
  display: flex;
  align-items: center;
  justify-content: center;
}

.notes {
  max-width: 1000px;
  width: 100%;

  &__text {
    font-size: 18px;
    font-weight: 300;
    line-height: 120%;
    user-select: none;
  }

  &__loading {
    font-size: 24px;
    font-weight: 600;
    line-height: 120%;
    padding: 16px;
  }

  &__buttons {
    @include flex;
    gap: 4px;
  }
}

.notes-edit {
  &__body {
    width: 100%;
    @include flex($fd: column, $ai: stretch);
    gap: 16px;
  }

  &__buttons {
    width: 100%;
    @include flex;
    gap: 8px;
  }

  &__button {
    flex: 1 1 50%;
  }
}

.notes-delete {
  &__buttons {
    width: 100%;
    @include flex;
    gap: 8px;
  }

  &__button {
    flex: 1 1 50%;
  }
}
</style>
