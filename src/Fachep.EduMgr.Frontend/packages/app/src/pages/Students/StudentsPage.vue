<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { StudentDto } from '@edumgr/openapi';
import { useStudentsStore } from '@/stores/entities/students';
import { fetchClassesMap } from '@/clients/range';
import { useTimetableStore } from '@/stores/timetable';
import { useUserProfileStore } from '@/stores/profile';
import ResourceList from '@/components/list/ResourceList.vue';
import { usePagedList } from '@/composables/usePagedList';

const ss = useStudentsStore();
const tt = useTimetableStore();
const profileStore = useUserProfileStore();

const { items, loading, page, total, load } = usePagedList<StudentDto>({
  loadFn: async (limit, offset) => {
    let data: StudentDto[] = [];
    if (profileStore.isTeacher && profileStore.profile?.id != null) {
      try {
        const allStudents = await tt.loadStudentsForTeacher(profileStore.profile.id);
        const start = offset;
        data = allStudents.slice(start, start + limit);
        total.value = allStudents.length;
      } catch (e) {
        console.error('load students for teacher failed', e);
        data = [];
      }
    } else {
      data = await ss.studentsPage(limit, offset);
    }
    try {
      const ids = Array.from(
        new Set(
          (data || []).map((s: StudentDto) => s.classId).filter((x): x is number => x != null),
        ),
      );
      classMap.value = await fetchClassesMap(ids);
    } catch {
      classMap.value = new Map();
    }
    return data;
  },
  countFn: async () => {
    if (profileStore.isTeacher && profileStore.profile?.id != null) {
      return 0;
    }
    return ss.studentsCount();
  },
  pageSize: 20,
});

const router = useRouter();
const canManage = computed(() => profileStore.isAdmin);
const classMap = ref<Map<string, string>>(new Map());
const columns = [
  { key: 'id', label: 'Id', width: '160px' },
  { key: 'name', label: '名称' },
  { key: 'classId', label: '班级' },
];
</script>

<template>
  <div v-loading="loading">
    <div class="page-header">
      <h3>学生</h3>
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
      <template #cell-classId="{ item }">
        {{ classMap.get(String(item.classId)) ?? item.classId }}
      </template>
      <template #actions="{ item }">
        <el-button
          v-if="canManage"
          type="text"
          @click="() => router.push(`/students/${item.id}/manage`)"
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
