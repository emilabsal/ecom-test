<template>
  <div class="without-footer-layout">
    <main class="without-footer-layout__main">
      <slot></slot>
    </main>
  </div>
</template>

<style scoped lang="scss">
.without-footer-layout__main {
  padding: 24px;
}
</style>
