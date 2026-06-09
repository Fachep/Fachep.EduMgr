<script lang="ts" setup>
import { Layout } from '@/components';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <component :is="route.meta?.bareLayout ? 'div' : Layout">
    <router-view />
  </component>
</template>

<style scoped></style>
