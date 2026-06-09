import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '@/clients';
import type { ClassDto, OrderByColumn } from '@edumgr/openapi';

export const useClassesStore = defineStore('classes', () => {
  const pageCache = ref<Record<string, ClassDto[]>>({});
  const rangeCache = ref<Record<string, ClassDto[]>>({});

  async function classesPage(
    limit = 1000,
    offset = 0,
    orderBy?: OrderByColumn[] | undefined,
    name?: string,
    teacherId?: number,
    departmentId?: number,
    majorId?: number,
  ) {
    const key = `p:${limit}:${offset}:${orderBy ?? ''}:${name ?? ''}:${teacherId ?? ''}:${departmentId ?? ''}:${majorId ?? ''}`;
    if (pageCache.value[key]) return pageCache.value[key];
    try {
      const resp = (await api.classesApi.classesPage(
        limit,
        offset,
        orderBy,
        name,
        teacherId,
        departmentId,
        majorId,
      )) as ClassDto[];
      pageCache.value[key] = resp || [];
      return pageCache.value[key];
    } catch (e) {
      console.error('classesPage error', e);
      return [] as ClassDto[];
    }
  }

  async function classesRange(ids: number[]) {
    if (!ids || !ids.length) return [] as ClassDto[];
    const key = ids.join(',');
    if (rangeCache.value[key]) return rangeCache.value[key];
    try {
      const resp = await api.classesApi.classesRange(ids as number[]);
      rangeCache.value[key] = resp || [];
      return rangeCache.value[key];
    } catch (e) {
      console.error('classesRange error', e);
      return [] as ClassDto[];
    }
  }

  async function classesCount(teacherId?: number) {
    try {
      if (teacherId != null) return await api.classesApi.classesCount(undefined, teacherId);
      return await api.classesApi.classesCount();
    } catch (e) {
      console.error('classesCount error', e);
      return 0;
    }
  }

  function clear() {
    pageCache.value = {};
    rangeCache.value = {};
  }

  return { classesPage, classesRange, classesCount, clear };
});
