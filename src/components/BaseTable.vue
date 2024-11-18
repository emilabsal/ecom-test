<template>
  <table class="table">
    <colgroup>
      <col
        v-for="col in columnsScheme"
        :key="col"
        :width="col"
      />
    </colgroup>
    <thead>
      <tr class="table__row">
        <th class="table__header">
          <BaseCheckbox v-model="all" />
        </th>
        <th
          class="table__header"
          v-for="column in columns"
          :key="column.id"
        >
          {{ column.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="!checkedRows.length">
        <td
          class="table__cell table__cell_empty"
          :colspan="columns.length + 1"
        >
          {{ all ? 'Нет выполненных дел' : 'Нет дел' }}
        </td>
      </tr>
      <template v-else>
        <BaseAnimation
          name="slide-right"
          group
        >
          <tr
            v-for="row in checkedRows"
            :key="row.id"
          >
            <td class="table__cell">
              <BaseCheckbox v-model="row.checkbox" />
            </td>
            <td
              :class="getCellClass(column.position)"
              v-for="column in columns"
              :key="column.id"
            >
              <slot
                :name="column.id"
                :row="row"
              ></slot>
            </td>
          </tr>
        </BaseAnimation>
      </template>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Table } from '@/types/table'
import BaseAnimation from './BaseAnimation.vue'
import BaseCheckbox from './BaseCheckbox.vue'
import { useRoute, useRouter } from 'vue-router'

const { rows } = defineProps<Table.Props>()

function getCellClass(position: Table.Column['position']) {
  return ['table__cell', position ? `table__cell_${position}` : '']
}

const all = ref(JSON.parse(localStorage.getItem('all') as string) || false)
const router = useRouter()

watch(all, (value) => {
  if (value) router.push({ query: { completed: 'true' } })
  else router.push({ query: { completed: 'false' } })

  localStorage.setItem('all', JSON.stringify(value))
})

const checkedRows = computed(() => {
  if (all.value) {
    return rows.filter((row) => row.checkbox === true)
  } else {
    return rows
  }
})
</script>

<style scoped lang="scss">
.table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 8px;

  tr {
    border-bottom: 1px solid rgba($black, 0.2);
  }

  tbody tr:last-child {
    border: none;
  }

  thead {
    position: sticky;
  }

  tbody {
    overflow: scroll;
    width: 100%;
    max-height: 100%;
  }

  &__header {
    font-size: 20px;
    line-height: 120%;
    padding: 16px 16px;
    font-weight: 600;
    text-align: left;
  }

  &__cell {
    padding: 8px 16px;
    font-size: 18px;
    font-weight: 300;
    line-height: 120%;

    &_left {
      text-align: left;
    }

    &_center {
      text-align: center;
    }

    &_right {
      text-align: right;
    }

    &_empty {
      text-align: center;
      padding-top: 24px;
    }
  }
}

// .slide-right-enter-active,
// .slide-right-leave-active {
//   transition: $transition ease;
// }
// .slide-right-enter-from,
// .slide-right-leave-to {
//   opacity: 0;
//   transform: translateX(30px);
// }
</style>
