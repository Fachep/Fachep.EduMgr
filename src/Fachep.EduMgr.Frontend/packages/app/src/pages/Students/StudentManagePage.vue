<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import type { ClassDto, StudentDto } from '@edumgr/openapi';
import { api } from '@/clients';
import { useClassesStore } from '@/stores/entities/classes';

const route = useRoute();
const router = useRouter();
const classesStore = useClassesStore();

const studentId = computed(() => Number(route.params.id));
const isEditing = computed(() => !!studentId.value && studentId.value > 0);

const student = ref<StudentDto | null>(null);
const loading = ref(false);
const saving = ref(false);
const classes = ref<ClassDto[]>([]);
const loadingClasses = ref(false);

const formData = ref({
  classId: undefined as number | undefined,
});

async function loadStudent() {
  if (!isEditing.value) return;
  loading.value = true;
  try {
    const data = await api.studentsApi.studentsDetail(studentId.value);
    student.value = data;
    formData.value.classId = data.classId ?? undefined;
  } catch (err) {
    console.error(err);
    ElMessage.error('加载学生信息失败');
  } finally {
    loading.value = false;
  }
}

async function loadClasses() {
  loadingClasses.value = true;
  try {
    const list = await classesStore.classesPage(1000, 0);
    classes.value = list;
  } catch (err) {
    console.error(err);
    classes.value = [];
  } finally {
    loadingClasses.value = false;
  }
}

async function saveStudent() {
  if (!isEditing.value || !student.value) return;

  saving.value = true;
  try {
    await api.studentsApi.studentsUpdate(studentId.value, {
      ...student.value,
      classId: formData.value.classId,
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
  void loadStudent();
  void loadClasses();
});
</script>

<template>
  <div v-loading="loading">
    <div class="page-header">
      <h3>管理学生</h3>
      <div class="page-header-actions">
        <el-button @click="goBack">返回</el-button>
      </div>
    </div>

    <el-card v-if="student">
      <template #header>
        <div class="card-header">
          <span>学生信息</span>
        </div>
      </template>
      <el-form :model="formData" label-width="120px">
        <el-form-item label="学生ID">
          <el-input :value="student.id" disabled />
        </el-form-item>
        <el-form-item label="学生姓名">
          <el-input :value="student.name" disabled />
        </el-form-item>
        <el-form-item label="所属班级">
          <el-select
            v-model="formData.classId"
            :loading="loadingClasses"
            clearable
            filterable
            placeholder="请选择班级"
            style="width: 100%"
          >
            <el-option
              v-for="cls in classes"
              :key="cls.id"
              :label="cls.name || String(cls.id)"
              :value="cls.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button :loading="saving" type="primary" @click="saveStudent">保存</el-button>
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
