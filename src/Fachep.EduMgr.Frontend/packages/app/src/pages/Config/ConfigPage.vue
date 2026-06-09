<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { api } from '@/clients';
import { ElMessage } from 'element-plus';

const configJson = ref('');
const loading = ref(false);

async function load() {
  loading.value = true;
  try {
    const cfg = await api.configApi.configGetConfig();
    configJson.value = JSON.stringify(cfg, null, 2);
  } catch (err) {
    console.error(err);
    configJson.value = '{}';
  } finally {
    loading.value = false;
  }
}

async function save() {
  try {
    const obj = JSON.parse(configJson.value);
    await api.configApi.configUpdateConfig(obj);
    ElMessage.success('已保存配置');
  } catch (err: any) {
    console.error(err);
    ElMessage.error('保存失败: ' + (err?.message ?? ''));
  }
}

onMounted(load);
</script>

<template>
  <el-card style="max-width: 900px; margin: 24px auto; padding: 20px">
    <h3>系统配置（管理员）</h3>
    <el-form>
      <el-form-item label="配置(JSON)">
        <el-input v-model="configJson" :rows="18" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="load">重载</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped></style>
