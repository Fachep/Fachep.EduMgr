<script lang="ts" setup>
import { ref } from 'vue';
import type { TeacherDto } from '@edumgr/openapi';
import { useTeachersStore } from '@/stores/entities/teachers';
import { fetchDepartmentsMap } from '@/clients/range';
import { useRouter } from 'vue-router';
import { useUserProfileStore } from '@/stores/profile';
import ResourceList from '@/components/list/ResourceList.vue';
import { usePagedList } from '@/composables/usePagedList';

const router = useRouter();
const ts = useTeachersStore();
const profileStore = useUserProfileStore();

const { items, loading, page, total, load } = usePagedList<TeacherDto>({
  loadFn: async (limit, offset) => {
    const data = await ts.teachersPage(limit, offset);
    try {
      const ids = Array.from(
        new Set((data || []).map((r) => r.departmentId).filter((x): x is number => x != null)),
      );
      departmentMap.value = await fetchDepartmentsMap(ids);
    } catch {
      departmentMap.value = new Map();
    }
    return data;
  },
  countFn: () => ts.teachersCount(),
});

const departmentMap = ref<Map<string, string>>(new Map());
const columns = [
  { key: 'id', label: 'Id', width: '160px' },
  { key: 'name', label: '名称' },
  { key: 'departmentId', label: '学院' },
];
</script>

<template>
  <div v-loading="loading">
    <div class="page-header">
      <h3>教师</h3>
      <div class="page-header-actions">
        <el-button :loading="loading" @click="() => load(page)">刷新</el-button>
      </div>
    </div>

    <ResourceList
      :clickableRow="false"
      :columns="columns"
      :items="items"
      :showIndex="false"
      rowKey="id"
    >
      <template #cell-departmentId="{ item }">
        {{ departmentMap.get(String(item.departmentId)) ?? item.departmentId }}
      </template>
      <template #actions="{ item }">
        <el-button type="text" @click="() => router.push(`/teachers/${item.id}/manage`)"
          >管理</el-button
        >
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
