<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import type { DepartmentDto, TeacherDto } from '@edumgr/openapi';
import { api } from '@/clients';
import { useDepartmentsStore } from '@/stores/entities/departments';

const route = useRoute();
const router = useRouter();
const departmentsStore = useDepartmentsStore();

const teacherId = computed(() => Number(route.params.id));
const isEditing = computed(() => !!teacherId.value && teacherId.value > 0);

const teacher = ref<TeacherDto | null>(null);
const loading = ref(false);
const saving = ref(false);
const departments = ref<DepartmentDto[]>([]);
const loadingDepartments = ref(false);

const formData = ref({
  departmentId: undefined as number | undefined,
});

async function loadTeacher() {
  if (!isEditing.value) return;
  loading.value = true;
  try {
    const data = await api.teachersApi.teachersDetail(teacherId.value);
    teacher.value = data;
    formData.value.departmentId = data.departmentId ?? undefined;
  } catch (err) {
    console.error(err);
    ElMessage.error('加载教师信息失败');
  } finally {
    loading.value = false;
  }
}

async function loadDepartments() {
  loadingDepartments.value = true;
  try {
    const list = await departmentsStore.departmentsPage(1000, 0);
    departments.value = list;
  } catch (err) {
    console.error(err);
    departments.value = [];
  } finally {
    loadingDepartments.value = false;
  }
}

async function saveTeacher() {
  if (!isEditing.value || !teacher.value) return;

  saving.value = true;
  try {
    await api.teachersApi.teachersUpdate(teacherId.value, {
      ...teacher.value,
      departmentId: formData.value.departmentId,
    });
    ElMessage.success('保存成功');
    router.go(-1);
  } catch (err: any) {
    console.error(err);
    ElMessage.error(err?.message || '保存失败');
  } finally {
    saving.value = false;
  }
}

function goBack() {
  router.go(-1);
}

onMounted(() => {
  void loadTeacher();
  void loadDepartments();
});
</script>

<template>
  <div v-loading="loading">
    <div class="page-header">
      <h3>管理教师</h3>
      <div class="page-header-actions">
        <el-button @click="goBack">返回</el-button>
      </div>
    </div>

    <el-card v-if="teacher">
      <template #header>
        <div class="card-header">
          <span>教师信息</span>
        </div>
      </template>
      <el-form :model="formData" label-width="120px">
        <el-form-item label="教师ID">
          <el-input :value="teacher.id" disabled />
        </el-form-item>
        <el-form-item label="教师姓名">
          <el-input :value="teacher.name" disabled />
        </el-form-item>
        <el-form-item label="所属学院">
          <el-select
            v-model="formData.departmentId"
            :loading="loadingDepartments"
            clearable
            filterable
            placeholder="请选择学院"
            style="width: 100%"
          >
            <el-option
              v-for="dept in departments"
              :key="dept.id"
              :label="dept.name || String(dept.id)"
              :value="dept.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button :loading="saving" type="primary" @click="saveTeacher">保存</el-button>
          <el-button @click="goBack">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
