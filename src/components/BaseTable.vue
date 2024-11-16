<template>
  <table class="table">
    <colgroup>
      <col v-for="col in columnsScheme" :key="col" :width="col"></col>
    </colgroup>
    <thead>
      <tr class="table__row">
        <th class="table__header" v-for="column in columns" :key="column.id">{{ column.label }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.id">
        <td class="table__cell" v-for="column in columns" :key="column.id">
          <slot :name="column.id" :row="row"></slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { Table } from '@/types/table'

defineProps<Table.Props>()
</script>

<style scoped lang="scss">
.table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
  border: none;

  tr {
    border-bottom: 4px solid $border;
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
    font-weight: 400;
    padding: 8px 16px;
    text-align: left;
  }

  &__cell {
    padding: 4px 16px;
  }
}

</style>
