<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { DepartmentDto } from '@edumgr/openapi';
import { useDepartmentsStore } from '@/stores/entities/departments';
import { useUserProfileStore } from '@/stores/profile';
import ResourceList from '@/components/list/ResourceList.vue';
import { ElMessage } from 'element-plus';
import { api } from '@/clients';
import { usePagedList } from '@/composables/usePagedList';

const router = useRouter();
const ds = useDepartmentsStore();
const profileStore = useUserProfileStore();
const deletingIds = ref<Set<number>>(new Set());

const { items, loading, page, total, load } = usePagedList<DepartmentDto>({
  loadFn: (limit, offset) => ds.departmentsPage(limit, offset),
});

const canCreate = computed(() => profileStore.isAdmin);
function goCreate() {
  router.push('/departments/create');
}
async function deleteDepartment(id?: number) {
  if (!id) return;
  if (deletingIds.value.has(id)) return;
  deletingIds.value.add(id);
  try {
    await api.departmentsApi.departmentsDelete(id);
    ElMessage.success('删除成功');
    ds.clear();
    await load(page.value);
  } catch (e) {
    console.error('departments delete error', e);
    ElMessage.error('删除失败');
  } finally {
    deletingIds.value.delete(id);
  }
}
</script>

<template>
  <div v-loading="loading">
    <div class="page-header">
      <h3>学院/部门</h3>
      <div class="page-header-actions">
        <el-button v-if="canCreate" type="primary" @click="goCreate">新建</el-button>
        <el-button :loading="loading" @click="() => load(page)">刷新</el-button>
      </div>
    </div>

    <ResourceList
      :columns="[
        { key: 'id', label: 'Id', width: '80px' },
        { key: 'name', label: '名称' },
      ]"
      :items="items"
      :loading="loading"
      :showIndex="false"
      rowKey="id"
    >
      <template #actions="{ item }">
        <el-button type="text" @click="() => router.push(`/departments/${item.id}/manage`)"
          >管理</el-button
        >
        <el-popconfirm title="确认删除该学院/部门？" @confirm="() => deleteDepartment(item.id)">
          <template #reference>
            <el-button
              :disabled="deletingIds.has(item.id)"
              :loading="deletingIds.has(item.id)"
              class="btn-text-danger"
              type="text"
              >删除</el-button
            >
          </template>
        </el-popconfirm>
      </template>
    </ResourceList>

    <div class="pagination-container">
      <el-pagination
        v-model:current-page="page"
        :page-size="20"
        :total="total"
        background
        layout="prev, pager, next"
        @current-change="(p) => load(p)"
      />
    </div>
  </div>
</template>

<style scoped></style>
