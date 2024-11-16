<template>
  <div class="notes-list">
    <BaseCard class="notes" title="Список заметок">
      <p v-if="isLoading" class="notes__loading">Loading...</p>
      <BaseTable
        v-else
        :columns="table.columns"
        :columns-scheme="table.columnsScheme"
        :rows="table.rows"
      >
        <template #check="{ row }">
          <BaseCheckbox v-model="model" :value="row.id" />
        </template>
        <template #number="{ row }">
          <p class="notes__text">{{ row.id + 1 }}</p>
        </template>
        <template #name="{ row }">
          <p class="notes__text">{{ row.name }}</p>
        </template>
        <template #buttons>
          <div class="notes__buttons">
            <BaseButton label="Редактировать" @click="isShowModal = true" />
            <BaseButton label="Удалить" />
          </div>
          <BaseModal> hello </BaseModal>
        </template>
        <template #link="{ row }">
          <RouterLink class="notes__text" :to="`/${row.id + 1}`">Ссылка</RouterLink>
        </template>
      </BaseTable>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseTable from '@/components/BaseTable.vue'
import BaseCard from '@/components/BaseCard.vue'
import BaseCheckbox from '@/components/BaseCheckbox.vue'
import BaseButton from '@/components/BaseButton.vue'
import { useApi } from '@/composables/useApi'
import BaseModal from '@/components/BaseModal.vue'

const model = ref([])

const { notes, isLoading } = useApi()

const table = computed(() => {
  return {
    columns: [
      { id: 'check', label: 'Отметка' },
      { id: 'number', label: 'Номер' },
      { id: 'name', label: 'Наименование' },
      { id: 'buttons' },
      { id: 'link', label: 'Ссылка' },
    ],
    columnsScheme: ['min-content', 'auto', 'max-content', 'auto', 'max-content', 'auto'],
    rows: notes.value,
  }
})

const isShowModal = ref(false)
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
</style>
