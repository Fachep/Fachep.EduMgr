<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useClassesStore } from '@/stores/entities/classes';
import { fetchTeachersMap } from '@/clients/range';
import { useUserProfileStore } from '@/stores/profile';
import { useRouter } from 'vue-router';
import ResourceList from '@/components/list/ResourceList.vue';
import { usePagedList } from '@/composables/usePagedList';
import type { ClassDto } from '@edumgr/openapi';

const cs = useClassesStore();
const profileStore = useUserProfileStore();

const { items, loading, page, total, load } = usePagedList<ClassDto>({
  loadFn: async (limit, offset) => {
    let data: ClassDto[] = [];
    if (profileStore.isTeacher && profileStore.profile?.id != null) {
      data = (await cs.classesPage(
        limit,
        offset,
        undefined,
        undefined,
        profileStore.profile.id,
      )) as ClassDto[];
    } else {
      data = (await cs.classesPage(limit, offset)) as ClassDto[];
    }
    try {
      const ids = Array.from(
        new Set(
          (data || []).map((r) => r.ownerId).filter((x): x is number => typeof x === 'number'),
        ),
      );
      if (ids.length) teacherMap.value = await fetchTeachersMap(ids);
      else teacherMap.value = new Map();
    } catch {
      teacherMap.value = new Map();
    }
    return data;
  },
  countFn: async () => {
    if (profileStore.isTeacher && profileStore.profile?.id != null) {
      return cs.classesCount(profileStore.profile.id);
    } else {
      return cs.classesCount();
    }
  },
  pageSize: 20,
});

const router = useRouter();
const canCreate = computed(() => profileStore.isAdmin || profileStore.isTeacher);
const teacherMap = ref<Map<string, string>>(new Map());
const columns = [
  { key: 'id', label: 'Id', width: '80px' },
  { key: 'name', label: '名称' },
  { key: 'ownerId', label: '教师' },
];
function goCreate() {
  router.push('/classes/create');
}
</script>

<template>
  <div v-loading="loading">
    <div class="page-header">
      <h3>班级</h3>
      <div class="page-header-actions">
        <el-button v-if="canCreate" type="primary" @click="goCreate">新建</el-button>
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
      <template #cell-ownerId="{ item }">
        {{ teacherMap.get(String(item.ownerId)) ?? item.ownerId }}
      </template>
      <template #actions="{ item }">
        <el-button type="text" @click="() => router.push(`/classes/${item.id}/manage`)"
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
