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
          <BaseCheckbox
            v-model="model"
            :value="row.id"
          />
        </template>
        <template #number="{ row }">
          <p class="notes__text">{{ row.id + 1 }}</p>
        </template>
        <template #name="{ row }">
          <p class="notes__text">{{ row.name }}</p>
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
          <BaseModal
            class="notes-edit"
            v-if="isShowModal"
            title="Редактировать"
            @close="onEditCloseModal"
          >
            <div class="notes-edit__body">
              <BaseInput v-model="data.model" />
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
        </template>
        <template #link="{ row }">
          {{ row }}
          <RouterLink
            class="notes__text"
            to="/"
            >Ссылка</RouterLink
          >
        </template>
      </BaseTable>
    </BaseCard>
    <BaseModal
      v-if="isShowDeleteModal && deletedNote"
      class="notes-delete"
      title="Удалить"
      @close="isShowDeleteModal = false"
    >
      <div class="notes-delete__buttons">
        <BaseButton
          class="notes-delete__button"
          label="Отмена"
          size="large"
          @click="isShowDeleteModal = false"
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

const store = useNotesStore()

const model = ref([])
const name = ref('e')

const { isLoading } = useNotes()

const table = computed(() => {
  return {
    columns: [
      { id: 'check' },
      { id: 'number', label: 'Номер' },
      { id: 'name', label: 'Наименование' },
      { id: 'buttons' },
      { id: 'link', label: 'Ссылка' }
    ],
    columnsScheme: ['min-content', 'auto', 'min-content', 'auto', 'max-content', 'auto'],
    rows: store.notes
  }
})
// edit modal
const isShowModal = ref(false)
const data = ref()

function openModal(row: any) {
  isShowModal.value = true

  data.value = {
    id: row.id,
    model: row.model
  }
}

function onEditCloseModal() {
  isShowModal.value = false
  store.notes.find((note: any) => note.id === data.value.id).model = data.value.model
}

function onEditSaveModal() {
  isShowModal.value = false
  store.notes.find((note: any) => note.id === data.value.id).model = data.value.model
  store.notes.find((note: any) => note.id === data.value.id).name = data.value.model
}

// delete modal
const isShowDeleteModal = ref(false)
const deletedNote = ref()

function openDeleteModal(row: any) {
  isShowDeleteModal.value = true
  deletedNote.value = row
}

function onDelete() {
  isShowDeleteModal.value = false
  store.notes = store.notes.filter((note: any) => note.id !== deletedNote.value.id)
  deletedNote.value = null
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
