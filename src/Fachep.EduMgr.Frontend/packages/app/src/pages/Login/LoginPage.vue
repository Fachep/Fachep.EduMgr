<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { loginAsync } from '@/clients/auth';
import { useUserProfileStore } from '@/stores/profile';
import { ElMessage } from 'element-plus';

const userId = ref<number | null | undefined>(undefined);
const password = ref('');
const loading = ref(false);
const router = useRouter();
const profileStore = useUserProfileStore();

const formRef = ref();
const rules = {
  userId: [{ required: true, message: '请输入用户 Id', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少 6 位', trigger: 'blur' },
  ],
};

async function submit() {
  if (!formRef.value) return;
  try {
    await formRef.value.validate();
  } catch (_err) {
    return;
  }
  if (!userId.value) return;
  loading.value = true;
  try {
    await loginAsync(userId.value, password.value);
    await profileStore.fetchProfile();
    await router.push('/home');
  } catch (err: unknown) {
    console.error(err);
    const msg = err instanceof Error ? err.message : String(err);
    ElMessage.error(msg || '登录失败');
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <el-card style="max-width: 420px; margin: 48px auto; padding: 20px">
    <h2>登录</h2>
    <el-form ref="formRef" :model="{ userId, password }" :rules="rules" @submit.prevent="submit">
      <el-form-item label="用户 Id" prop="userId">
        <el-input-number v-model="userId" :controls="false" style="width: 100%" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="password" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="submit">登录</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped>
h2 {
  margin-bottom: 12px;
}
</style>
