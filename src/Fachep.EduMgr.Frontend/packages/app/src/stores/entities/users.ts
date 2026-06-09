import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '@/clients';
import type { OrderByColumn, UserDto } from '@edumgr/openapi';

export const useUsersStore = defineStore('users', () => {
  const pageCache = ref<Record<string, UserDto[]>>({});

  async function usersPage(limit = 1000, offset = 0, orderBy?: OrderByColumn[] | undefined) {
    const key = `p:${limit}:${offset}:${orderBy ?? ''}`;
    if (pageCache.value[key]) return pageCache.value[key];
    try {
      const resp = await api.usersApi.usersPage(limit, offset, orderBy);
      pageCache.value[key] = resp || [];
      return pageCache.value[key];
    } catch (e) {
      console.error('usersPage error', e);
      return [] as UserDto[];
    }
  }

  async function usersCount() {
    try {
      const cnt = await api.usersApi.usersCount();
      return cnt ?? 0;
    } catch (e) {
      console.error('usersCount error', e);
      return 0;
    }
  }

  function clear() {
    pageCache.value = {};
  }

  return { usersPage, usersCount, clear };
});
