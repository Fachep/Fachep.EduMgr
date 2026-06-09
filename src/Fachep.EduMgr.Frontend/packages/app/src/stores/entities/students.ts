import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '@/clients';
import type { OrderByColumn, StudentDto } from '@edumgr/openapi';

export const useStudentsStore = defineStore('students', () => {
  const pageCache = ref<Record<string, StudentDto[]>>({});
  const rangeCache = ref<Record<string, StudentDto[]>>({});

  async function studentsPage(
    limit = 1000,
    offset = 0,
    orderBy?: OrderByColumn[] | undefined,
    classId?: number,
  ) {
    const key = `p:${limit}:${offset}:${orderBy ?? ''}:${classId ?? ''}`;
    if (pageCache.value[key]) return pageCache.value[key];
    try {
      const resp = await api.studentsApi.studentsPage(limit, offset, orderBy, undefined, classId);
      pageCache.value[key] = resp || [];
      return pageCache.value[key];
    } catch (e) {
      console.error('studentsPage error', e);
      return [] as StudentDto[];
    }
  }

  async function studentsRange(ids: number[]) {
    if (!ids || !ids.length) return [] as StudentDto[];
    const key = ids.join(',');
    if (rangeCache.value[key]) return rangeCache.value[key];
    try {
      const resp = await api.studentsApi.studentsRange(ids);
      rangeCache.value[key] = resp || [];
      return rangeCache.value[key];
    } catch (e) {
      console.error('studentsRange error', e);
      return [] as StudentDto[];
    }
  }

  async function studentsCount(classId?: number) {
    try {
      const cnt = await api.studentsApi.studentsCount(undefined, classId);
      return cnt ?? 0;
    } catch (e) {
      console.error('studentsCount error', e);
      return 0;
    }
  }

  function clear() {
    pageCache.value = {};
    rangeCache.value = {};
  }

  return { studentsPage, studentsRange, studentsCount, clear };
});
