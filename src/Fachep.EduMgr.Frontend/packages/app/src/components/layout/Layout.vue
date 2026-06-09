<template>
  <el-container class="app-root">
    <app-header />
    <el-container class="app-body">
      <app-nav />
      <el-main class="app-main">
        <slot />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import AppHeader from './AppHeader.vue';
import AppNav from './AppNav.vue';
</script>

<style scoped>
.app-root {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.app-body {
  flex: 1;
  display: flex;
  min-height: 0;
}
.app-main {
  padding: 16px;
  overflow: auto;
  min-height: 0;
}
.app-body > .el-aside {
  overflow: auto;
  min-height: 0;
}
</style>
