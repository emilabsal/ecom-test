<template>
  <div class="home">
    <BaseCard
      class="content"
      title="Содержание"
    >
      <nav class="content__nav">
        <ul class="content__list">
          <li
            v-for="item in nav"
            :key="item.label"
          >
            <RouterLink
              class="content__link"
              :to="item.link"
              >{{ item.label }}</RouterLink
            >
          </li>
        </ul>
      </nav>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import BaseCard from '@/components/BaseCard.vue'

const nav = [
  {
    label: 'Заметки',
    link: '/notes'
  },
  {
    label: 'Добавить заметку',
    link: '/add'
  }
]
</script>

<style scoped lang="scss">
.home {
  width: 100%;
  padding-top: 24px;
  @include flex;
}

.content {
  &__list {
    @include flex($fd: column, $ai: start, $gap: 16px);
  }

  &__link {
    font-size: 24px;
  }
}
</style>
