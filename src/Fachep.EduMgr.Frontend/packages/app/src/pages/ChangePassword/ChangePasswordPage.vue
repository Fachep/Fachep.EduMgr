<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { api } from '@/clients';
import { ElMessage } from 'element-plus';

const oldPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const loading = ref(false);
const router = useRouter();

const formRef = ref();
const rules = {
  oldPassword: [{ required: true, message: '请输入当前密码', trigger: 'blur' }],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, message: '新密码至少 6 位', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    {
      validator: (rule: unknown, value: string, callback: (err?: Error) => void) => {
        if (value !== newPassword.value) {
          callback(new Error('两次输入的密码不一致'));
        } else {
          callback();
        }
      },
      trigger: 'blur',
    },
  ],
};

async function submit() {
  if (!formRef.value) return;
  await formRef.value.validate(async (valid: boolean) => {
    if (!valid) return;
    loading.value = true;
    try {
      await api.authApi.authChangePassword({
        oldPassword: oldPassword.value,
        newPassword: newPassword.value,
      });
      ElMessage.success('密码已修改');
      router.push('/profile');
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : String(err);
      ElMessage.error(msg || '修改密码失败');
    } finally {
      loading.value = false;
    }
  });
}
</script>

<template>
  <el-card style="max-width: 640px; margin: 24px auto; padding: 20px">
    <h3>修改密码</h3>
    <el-form
      ref="formRef"
      :model="{ oldPassword, newPassword, confirmPassword }"
      :rules="rules"
      @submit.prevent="submit"
    >
      <el-form-item label="当前密码" prop="oldPassword">
        <el-input v-model="oldPassword" type="password" />
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="newPassword" type="password" />
      </el-form-item>
      <el-form-item label="确认新密码" prop="confirmPassword">
        <el-input v-model="confirmPassword" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped>
h3 {
  margin-bottom: 12px;
}
</style>
