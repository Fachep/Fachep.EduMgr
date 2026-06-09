import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '@/clients';
import type { DepartmentDto, OrderByColumn } from '@edumgr/openapi';

export const useDepartmentsStore = defineStore('departments', () => {
  const pageCache = ref<Record<string, DepartmentDto[]>>({});

  async function departmentsPage(limit = 1000, offset = 0, orderBy?: OrderByColumn[] | undefined) {
    const key = `p:${limit}:${offset}:${orderBy ?? ''}`;
    if (pageCache.value[key]) return pageCache.value[key];
    try {
      const resp = await api.departmentsApi.departmentsPage(limit, offset, orderBy);
      pageCache.value[key] = resp || [];
      return pageCache.value[key];
    } catch (e) {
      console.error('departmentsPage error', e);
      return [] as DepartmentDto[];
    }
  }

  async function departmentsCount() {
    try {
      const cnt = await api.departmentsApi.departmentsCount();
      return cnt ?? 0;
    } catch (e) {
      console.error('departmentsCount error', e);
      return 0;
    }
  }

  async function departmentsRange(ids: number[]) {
    if (!ids || !ids.length) return [] as DepartmentDto[];
    const key = ids.join(',');
    try {
      const resp = await api.departmentsApi.departmentsRange(ids as number[]);
      return resp || [];
    } catch (e) {
      console.error('departmentsRange error', e);
      return [] as DepartmentDto[];
    }
  }

  function clear() {
    pageCache.value = {};
  }

  return { departmentsPage, departmentsCount, departmentsRange, clear };
});
