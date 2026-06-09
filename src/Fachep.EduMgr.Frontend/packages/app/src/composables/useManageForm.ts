import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

interface ManageFormOptions<T> {
  loadDetailFn?: (id: number) => Promise<T>;
  createFn: (data: T) => Promise<void>;
  updateFn?: (id: number, data: T) => Promise<void>;
  deleteFn?: (id: number) => Promise<void>;
  listRoute: string;
  formInitial: T;
}

export function useManageForm<T extends Record<string, unknown>>(
  id: number | null,
  isCreating: boolean,
  options: ManageFormOptions<T>,
) {
  const { loadDetailFn, createFn, updateFn, deleteFn, listRoute, formInitial } = options;
  const router = useRouter();

  const loading = ref(false);
  const saving = ref(false);
  const detail = ref<T | null>(null);
  const form = ref<T>({ ...formInitial });
  const showEdit = ref(false);

  async function loadData() {
    if (isCreating || !id || !loadDetailFn) return;

    loading.value = true;
    try {
      detail.value = await loadDetailFn(id);
      form.value = { ...detail.value };
    } catch (e) {
      console.error('loadData error', e);
    } finally {
      loading.value = false;
    }
  }

  function goBack() {
    router.push(listRoute);
  }

  async function onSave() {
    saving.value = true;
    try {
      if (isCreating) {
        await createFn(form.value);
        ElMessage.success('创建成功');
        goBack();
      } else if (id && updateFn) {
        await updateFn(id, form.value);
        ElMessage.success('保存成功');
        showEdit.value = false;
        await loadData();
      }
    } catch (e) {
      console.error('onSave error', e);
      ElMessage.error('保存失败');
    } finally {
      saving.value = false;
    }
  }

  async function onDelete() {
    if (!id || !deleteFn) return;

    try {
      await deleteFn(id);
      ElMessage.success('删除成功');
      goBack();
    } catch (e) {
      console.error('onDelete error', e);
      ElMessage.error('删除失败');
    }
  }

  return {
    loading,
    saving,
    detail,
    form,
    showEdit,
    loadData,
    goBack,
    onSave,
    onDelete,
  };
}
