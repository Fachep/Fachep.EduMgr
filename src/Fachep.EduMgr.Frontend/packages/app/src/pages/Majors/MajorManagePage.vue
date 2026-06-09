<template>
  <div v-loading="loading">
    <div class="page-header">
      <h3>{{ isCreating ? '新建专业' : '专业管理' }}</h3>
      <el-button :loading="loading" @click="loadData">刷新</el-button>
    </div>

    <el-card>
      <template #header>
        <div class="card-header">
          <span>基本信息</span>
          <div v-if="!isCreating" class="card-header-actions">
            <el-button size="small" type="primary" @click="showEdit = true">编辑</el-button>
            <el-popconfirm title="确认删除该专业？" @confirm="onDelete">
              <template #reference>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </div>
        </div>
      </template>

      <template v-if="!isCreating && detail">
        <el-descriptions :column="1" border>
          <el-descriptions-item label="ID">{{ detail.id }}</el-descriptions-item>
          <el-descriptions-item label="名称">{{ detail.name }}</el-descriptions-item>
          <el-descriptions-item label="所属部门">{{
            deptMap.get(detail.departmentId || 0) || '-'
          }}</el-descriptions-item>
        </el-descriptions>
      </template>

      <template v-else>
        <el-form :model="form" label-width="100px" style="max-width: 520px">
          <el-form-item label="名称" required>
            <el-input v-model="form.name" placeholder="请输入专业名称" />
          </el-form-item>
          <el-form-item label="部门" required>
            <el-select
              v-model="form.departmentId"
              filterable
              placeholder="请选择部门"
              style="width: 100%"
            >
              <el-option v-for="d in departments" :key="d.id" :label="d.name" :value="d.id" />
            </el-select>
          </el-form-item>
          <el-form-item class="form-actions">
            <el-button :loading="saving" type="primary" @click="onSave">{{
              isCreating ? '创建' : '保存'
            }}</el-button>
            <el-button @click="goBack">取消</el-button>
          </el-form-item>
        </el-form>
      </template>
    </el-card>

    <el-dialog v-model="showEdit" title="编辑专业" width="520px">
      <el-form :model="form" label-width="100px">
        <el-form-item label="名称" required>
          <el-input v-model="form.name" placeholder="请输入专业名称" />
        </el-form-item>
        <el-form-item label="部门" required>
          <el-select
            v-model="form.departmentId"
            filterable
            placeholder="请选择部门"
            style="width: 100%"
          >
            <el-option v-for="d in departments" :key="d.id" :label="d.name" :value="d.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showEdit = false">取消</el-button>
        <el-button :loading="saving" type="primary" @click="onSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { DepartmentDto, MajorDto } from '@edumgr/openapi';
import { api } from '@/clients';
import { ElMessage } from 'element-plus';

const route = useRoute();
const router = useRouter();
const id = computed(() => (route.params.id ? Number(route.params.id) : null));
const isCreating = computed(() => route.path.endsWith('/create'));

const loading = ref(false);
const saving = ref(false);
const detail = ref<MajorDto | null>(null);
const form = ref<{ name: string; departmentId: number | null }>({ name: '', departmentId: null });
const showEdit = ref(false);

const departments = ref<DepartmentDto[]>([]);
const deptMap = computed(() => new Map(departments.value.map((d) => [d.id!, d.name!])));

async function loadDepartments() {
  const res = await api.departmentsApi.departmentsPage(500, 0);
  departments.value = res || [];
}

async function loadData() {
  loading.value = true;
  try {
    await loadDepartments();
    if (!isCreating.value && id.value) {
      detail.value = await api.majorsApi.majorsDetail(id.value);
      form.value = {
        name: detail.value?.name || '',
        departmentId: detail.value?.departmentId || null,
      };
    }
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
}

function goBack() {
  router.push('/majors');
}

async function onSave() {
  if (!form.value.name || !form.value.name.trim()) {
    ElMessage.error('请输入名称');
    return;
  }
  if (!form.value.departmentId) {
    ElMessage.error('请选择部门');
    return;
  }
  saving.value = true;
  try {
    if (isCreating.value) {
      await api.majorsApi.majorsCreate({
        name: form.value.name,
        departmentId: form.value.departmentId,
      } as MajorDto);
      ElMessage.success('创建成功');
      goBack();
    } else if (id.value) {
      await api.majorsApi.majorsUpdate(id.value, {
        id: id.value,
        name: form.value.name,
        departmentId: form.value.departmentId,
      } as MajorDto);
      ElMessage.success('保存成功');
      showEdit.value = false;
      await loadData();
    }
  } catch (e) {
    console.error(e);
    ElMessage.error('保存失败');
  } finally {
    saving.value = false;
  }
}

async function onDelete() {
  if (!id.value) return;
  try {
    await api.majorsApi.majorsDelete(id.value);
    ElMessage.success('删除成功');
    goBack();
  } catch (e) {
    console.error(e);
    ElMessage.error('删除失败');
  }
}

onMounted(loadData);
</script>

<style scoped>
.el-card {
  border-radius: 8px;
}
</style>
