<template>
  <div v-loading="loading">
    <div class="page-header">
      <h3>{{ isCreating ? '新建部门' : '部门管理' }}</h3>
      <el-button :loading="loading" @click="loadData">刷新</el-button>
    </div>

    <el-card>
      <template #header>
        <div class="card-header">
          <span>基本信息</span>
          <div v-if="!isCreating" class="card-header-actions">
            <el-button size="small" type="primary" @click="showEdit = true">编辑</el-button>
            <el-popconfirm title="确认删除该部门？" @confirm="onDelete">
              <template #reference>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </div>
        </div>
      </template>

      <template v-if="!isCreating && detail">
        <el-descriptions :column="1" border>
          <el-descriptions-item label="ID">{{ id }}</el-descriptions-item>
          <el-descriptions-item label="名称">{{ detail.name }}</el-descriptions-item>
        </el-descriptions>
      </template>

      <template v-else>
        <el-form :model="form" label-width="100px" style="max-width: 520px">
          <el-form-item label="名称" required>
            <el-input v-model="form.name" placeholder="请输入部门名称" />
          </el-form-item>
          <el-form-item class="form-actions">
            <el-button :loading="saving" type="primary" @click="onSave">{{
              isCreating ? '创建' : '保存'
            }}</el-button>
            <el-button @click="goBack">取消</el-button>
          </el-form-item>
        </el-form>
      </template>
    </el-card>

    <el-dialog v-model="showEdit" title="编辑部门" width="520px">
      <el-form :model="form" label-width="100px">
        <el-form-item label="名称" required>
          <el-input v-model="form.name" placeholder="请输入部门名称" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showEdit = false">取消</el-button>
        <el-button :loading="saving" type="primary" @click="onSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import type { DepartmentDto } from '@edumgr/openapi';
import { api } from '@/clients';
import { useManageForm } from '@/composables/useManageForm';
import { ElMessage } from 'element-plus';

const route = useRoute();
const id = computed(() => (route.params.id ? Number(route.params.id) : null));
const isCreating = computed(() => route.path.endsWith('/create'));

const {
  loading,
  saving,
  detail,
  form,
  showEdit,
  loadData,
  goBack,
  onSave: originalOnSave,
  onDelete,
} = useManageForm<{ name: string }>(id.value, isCreating.value, {
  loadDetailFn: async (id) => {
    const data = await api.departmentsApi.departmentsDetail(id);
    return { name: data.name ?? '' } as { name: string };
  },
  createFn: async (form) => {
    await api.departmentsApi.departmentsCreate({ name: form.name } as DepartmentDto);
  },
  updateFn: async (id, form) => {
    await api.departmentsApi.departmentsUpdate(id, { id, name: form.name } as DepartmentDto);
  },
  deleteFn: async (id) => {
    await api.departmentsApi.departmentsDelete(id);
  },
  listRoute: '/departments',
  formInitial: { name: '' },
});

async function onSave() {
  if (!form.value.name || !form.value.name.trim()) {
    ElMessage.error('请输入名称');
    return;
  }
  await originalOnSave();
}
</script>

<style scoped>
.el-card {
  border-radius: 8px;
}
</style>
