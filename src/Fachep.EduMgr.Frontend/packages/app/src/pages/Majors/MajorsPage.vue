<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { MajorDto } from '@edumgr/openapi';
import { useMajorsStore } from '@/stores/entities/majors';
import { fetchDepartmentsMap } from '@/clients/range';
import { useUserProfileStore } from '@/stores/profile';
import ResourceList from '@/components/list/ResourceList.vue';
import { ElMessage } from 'element-plus';
import { api } from '@/clients';
import { usePagedList } from '@/composables/usePagedList';

const ms = useMajorsStore();
const { items, loading, page, total, load } = usePagedList<MajorDto>({
  loadFn: async (limit, offset) => {
    const data = await ms.majorsPage(limit, offset);
    const ids = Array.from(
      new Set(
        (data || []).map((r: MajorDto) => r.departmentId).filter((x): x is number => x != null),
      ),
    );
    try {
      departmentMap.value = await fetchDepartmentsMap(ids);
    } catch {
      departmentMap.value = new Map();
    }
    return data;
  },
  countFn: async () => ms.majorsCount(),
  pageSize: 20,
});

const deletingIds = ref<Set<number>>(new Set());
const router = useRouter();
const profileStore = useUserProfileStore();
const canCreate = computed(() => profileStore.isAdmin);
const departmentMap = ref<Map<string, string>>(new Map());
function goCreate() {
  router.push('/majors/create');
}

async function deleteMajor(id?: number) {
  if (!id) return;
  if (deletingIds.value.has(id)) return;
  deletingIds.value.add(id);
  try {
    await api.majorsApi.majorsDelete(id);
    ElMessage.success('删除成功');
    ms.clear();
    await load(page.value);
  } catch (e) {
    console.error('majors delete error', e);
    ElMessage.error('删除失败');
  } finally {
    deletingIds.value.delete(id);
  }
}
</script>

<template>
  <div v-loading="loading">
    <div class="page-header">
      <h3>专业</h3>
      <div class="page-header-actions">
        <el-button v-if="canCreate" type="primary" @click="goCreate">新建</el-button>
        <el-button :loading="loading" @click="() => load(page)">刷新</el-button>
      </div>
    </div>

    <ResourceList
      :columns="[
        { key: 'id', label: 'Id', width: '80px' },
        { key: 'name', label: '名称' },
        { key: 'departmentId', label: '学院' },
      ]"
      :items="items"
      :loading="loading"
      :showIndex="false"
      rowKey="id"
    >
      <template #cell-departmentId="{ item }">{{
        departmentMap.get(String(item.departmentId)) ?? item.departmentId
      }}</template>
      <template #actions="{ item }">
        <el-button type="text" @click="() => router.push(`/majors/${item.id}/manage`)"
          >管理</el-button
        >
        <el-popconfirm title="确认删除该专业？" @confirm="() => deleteMajor(item.id)">
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
