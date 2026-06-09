import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '@/clients';
import type { MajorDto, OrderByColumn } from '@edumgr/openapi';

export const useMajorsStore = defineStore('majors', () => {
  const pageCache = ref<Record<string, MajorDto[]>>({});

  async function majorsPage(limit = 1000, offset = 0, orderBy?: OrderByColumn[] | undefined) {
    const key = `p:${limit}:${offset}:${orderBy ?? ''}`;
    if (pageCache.value[key]) return pageCache.value[key];
    try {
      const resp = await api.majorsApi.majorsPage(limit, offset, orderBy);
      pageCache.value[key] = resp || [];
      return pageCache.value[key];
    } catch (e) {
      console.error('majorsPage error', e);
      return [] as MajorDto[];
    }
  }

  async function majorsCount() {
    try {
      const cnt = await api.majorsApi.majorsCount();
      return cnt ?? 0;
    } catch (e) {
      console.error('majorsCount error', e);
      return 0;
    }
  }

  async function majorsRange(ids: number[]) {
    if (!ids || !ids.length) return [] as MajorDto[];
    try {
      const resp = await api.majorsApi.majorsRange(ids as number[]);
      return resp || [];
    } catch (e) {
      console.error('majorsRange error', e);
      return [] as MajorDto[];
    }
  }

  function clear() {
    pageCache.value = {};
  }

  return { majorsPage, majorsCount, majorsRange, clear };
});
