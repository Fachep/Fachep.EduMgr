import { onMounted, ref } from 'vue';
import { PAGE_SIZE } from '@/constants/pagination';

interface PagedListOptions<T> {
  loadFn: (limit: number, offset: number) => Promise<T[]>;
  countFn?: () => Promise<number>;
  pageSize?: number;
  autoLoad?: boolean;
}

export function usePagedList<T>(options: PagedListOptions<T>) {
  const { loadFn, countFn, pageSize = PAGE_SIZE, autoLoad = true } = options;

  const items = ref<T[]>([]);
  const loading = ref(false);
  const page = ref(1);
  const total = ref(0);

  async function load(p = 1) {
    loading.value = true;
    try {
      const offset = (p - 1) * pageSize;
      items.value = await loadFn(pageSize, offset);

      if (countFn) {
        try {
          total.value = await countFn();
        } catch {
          fallbackTotal();
        }
      } else {
        fallbackTotal();
      }

      page.value = p;
    } catch (err) {
      console.error('usePagedList load error', err);
      items.value = [];
    } finally {
      loading.value = false;
    }
  }

  function fallbackTotal() {
    if ((items.value?.length ?? 0) < pageSize) {
      total.value = (page.value - 1) * pageSize + (items.value?.length ?? 0);
    } else {
      total.value = page.value * pageSize + 1;
    }
  }

  if (autoLoad) {
    onMounted(() => load(1));
  }

  return {
    items,
    loading,
    page,
    total,
    load,
  };
}
