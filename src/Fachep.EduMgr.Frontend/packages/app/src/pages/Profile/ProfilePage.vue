<script lang="ts" setup>
import { ref } from 'vue';
import { useUserProfileStore } from '@/stores/profile';

const store = useUserProfileStore();
const name = ref(store.profile?.name ?? '');
const email = ref(store.profile?.email ?? '');

async function save() {
  await store.updateProfile(name.value || undefined, email.value || undefined);
}
</script>

<template>
  <el-card style="max-width: 640px; margin: 24px auto; padding: 20px">
    <h2>个人资料</h2>
    <el-form>
      <el-form-item label="名称">
        <el-input v-model="name" />
      </el-form-item>
      <el-form-item label="电子邮件">
        <el-input v-model="email" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped>
h2 {
  margin-bottom: 12px;
}
</style>
