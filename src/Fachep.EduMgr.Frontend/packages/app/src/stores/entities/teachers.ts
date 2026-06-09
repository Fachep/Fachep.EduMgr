import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '@/clients';
import type { OrderByColumn, TeacherDto } from '@edumgr/openapi';

export const useTeachersStore = defineStore('teachers', () => {
  const pageCache = ref<Record<string, TeacherDto[]>>({});
  const rangeCache = ref<Record<string, TeacherDto[]>>({});

  async function teachersRange(ids: number[]) {
    if (!ids || !ids.length) return [] as TeacherDto[];
    const key = ids.join(',');
    if (rangeCache.value[key]) return rangeCache.value[key];
    try {
      const resp = await api.teachersApi.teachersRange(ids as number[]);
      rangeCache.value[key] = resp || [];
      return rangeCache.value[key];
    } catch (e) {
      console.error('teachersRange error', e);
      return [] as TeacherDto[];
    }
  }

  async function teachersPage(
    limit = 1000,
    offset = 0,
    orderBy?: OrderByColumn[] | undefined,
    departmentId?: number,
  ) {
    const key = `p:${limit}:${offset}:${orderBy ?? ''}:${departmentId ?? ''}`;
    if (pageCache.value[key]) return pageCache.value[key];
    try {
      const resp = await api.teachersApi.teachersPage(
        limit,
        offset,
        orderBy,
        undefined,
        departmentId,
      );
      pageCache.value[key] = resp || [];
      return pageCache.value[key];
    } catch (e) {
      console.error('teachersPage error', e);
      return [] as TeacherDto[];
    }
  }

  async function teachersCount() {
    try {
      const cnt = await api.teachersApi.teachersCount();
      return cnt ?? 0;
    } catch (e) {
      console.error('teachersCount error', e);
      return 0;
    }
  }

  function clear() {
    pageCache.value = {};
    rangeCache.value = {};
  }

  return { teachersRange, teachersPage, teachersCount, clear };
});
