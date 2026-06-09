import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '@/clients';
import type { OrderByColumn, SubjectDto } from '@edumgr/openapi';

export const useSubjectsStore = defineStore('subjects', () => {
  const departmentPageCache = ref<Record<number, SubjectDto[]>>({});

  async function subjectsPageForDepartment(departmentId: number) {
    if (!departmentId) return [] as SubjectDto[];
    if (departmentPageCache.value[departmentId]) return departmentPageCache.value[departmentId];
    try {
      const resp = await api.subjectsApi.subjectsPage(1000, 0, undefined, undefined, departmentId);
      departmentPageCache.value[departmentId] = resp || [];
      return departmentPageCache.value[departmentId];
    } catch (e) {
      console.error('subjectsPageForDepartment error', e);
      return [] as SubjectDto[];
    }
  }

  async function subjectsPage(
    limit = 1000,
    offset = 0,
    orderBy?: OrderByColumn[] | undefined,
    departmentId?: number,
  ) {
    if (departmentId != null) return subjectsPageForDepartment(departmentId);
    try {
      const resp = await api.subjectsApi.subjectsPage(limit, offset, orderBy);
      return resp || [];
    } catch (e) {
      console.error('subjectsPage error', e);
      return [] as SubjectDto[];
    }
  }

  async function subjectsCount(name?: string, departmentId?: number) {
    try {
      const cnt = await api.subjectsApi.subjectsCount(name, departmentId);
      return cnt ?? 0;
    } catch (e) {
      console.error('subjectsCount error', e);
      return 0;
    }
  }

  function clear(departmentId?: number) {
    if (departmentId) delete departmentPageCache.value[departmentId];
    else departmentPageCache.value = {};
  }

  return { subjectsPageForDepartment, subjectsPage, subjectsCount, clear };
});
