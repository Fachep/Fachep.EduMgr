<template>
  <div v-loading="loading">
    <div class="page-header">
      <h3>{{ isCreating ? '新建班级' : '班级管理' }}</h3>
      <el-button :loading="loading" @click="loadData">刷新</el-button>
    </div>

    <el-card>
      <template #header>
        <div class="card-header">
          <span>基本信息</span>
          <div v-if="!isCreating" class="card-header-actions">
            <el-button size="small" type="primary" @click="showEdit = true">编辑</el-button>
            <el-popconfirm title="确认删除该班级?" @confirm="onDelete">
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
          <el-descriptions-item label="所属专业">{{
            majorMap.get(detail.majorId || 0) || '-'
          }}</el-descriptions-item>
          <el-descriptions-item label="班主任">{{
            teacherMap.get(detail.ownerId || 0) || '-'
          }}</el-descriptions-item>
        </el-descriptions>
      </template>

      <template v-else>
        <el-form :model="form" label-width="110px" style="max-width: 560px">
          <el-form-item label="名称" required>
            <el-input v-model="form.name" placeholder="请输入班级名称" />
          </el-form-item>
          <el-form-item label="所属专业" required>
            <el-select
              v-model="form.majorId"
              filterable
              placeholder="请选择专业"
              style="width: 100%"
              @change="loadTeachersForMajor"
            >
              <el-option v-for="m in majors" :key="m.id" :label="m.name" :value="m.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="班主任" required>
            <el-select
              v-model="form.ownerId"
              filterable
              placeholder="请选择教师"
              style="width: 100%"
            >
              <el-option
                v-for="t in teachers"
                :key="t.id"
                :label="t.name ?? String(t.id)"
                :value="t.id"
              />
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

    <el-dialog v-model="showEdit" title="编辑班级" width="560px">
      <el-form :model="form" label-width="110px">
        <el-form-item label="名称" required>
          <el-input v-model="form.name" placeholder="请输入班级名称" />
        </el-form-item>
        <el-form-item label="所属专业" required>
          <el-select
            v-model="form.majorId"
            filterable
            placeholder="请选择专业"
            style="width: 100%"
            @change="loadTeachersForMajor"
          >
            <el-option v-for="m in majors" :key="m.id" :label="m.name" :value="m.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="班主任" required>
          <el-select v-model="form.ownerId" filterable placeholder="请选择教师" style="width: 100%">
            <el-option
              v-for="t in teachers"
              :key="t.id"
              :label="t.name ?? String(t.id)"
              :value="t.id"
            />
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
import type { ClassDto, MajorDto, TeacherDto } from '@edumgr/openapi';
import { api } from '@/clients';
import { ElMessage } from 'element-plus';

const route = useRoute();
const router = useRouter();
const id = computed(() => (route.params.id ? Number(route.params.id) : null));
const isCreating = computed(() => route.path.endsWith('/create'));

const loading = ref(false);
const saving = ref(false);
const detail = ref<ClassDto | null>(null);
const form = ref<{ name: string; ownerId: number | null; majorId: number | null }>({
  name: '',
  ownerId: null,
  majorId: null,
});
const showEdit = ref(false);

const majors = ref<MajorDto[]>([]);
const teachers = ref<TeacherDto[]>([]);
const majorMap = computed(() => new Map(majors.value.map((m) => [m.id!, m.name!])));
const teacherMap = computed(() => new Map(teachers.value.map((t) => [t.id!, t.name ?? ''])));

async function loadMajors() {
  const res = await api.majorsApi.majorsPage(500, 0);
  majors.value = res || [];
}

async function loadTeachersForMajor(majorId?: number | null) {
  const targetMajorId = majorId ?? form.value.majorId;
  if (!targetMajorId) {
    teachers.value = [];
    return;
  }
  try {
    const major =
      majors.value.find((m) => m.id === targetMajorId) ||
      (await api.majorsApi.majorsDetail(targetMajorId));
    const departmentId = (major as MajorDto)?.departmentId ?? undefined;
    teachers.value = (await api.teachersApi.teachersPage(
      500,
      0,
      undefined,
      undefined,
      departmentId as number | undefined,
    )) as TeacherDto[];
  } catch {
    teachers.value = (await api.teachersApi.teachersPage(500, 0)) as TeacherDto[];
  }
}

async function loadData() {
  loading.value = true;
  try {
    await loadMajors();
    if (!isCreating.value && id.value) {
      detail.value = await api.classesApi.classesDetail(id.value);
      form.value = {
        name: detail.value?.name || '',
        ownerId: detail.value?.ownerId || null,
        majorId: detail.value?.majorId || null,
      };
    }
    await loadTeachersForMajor(form.value.majorId);
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
}

function goBack() {
  router.push('/classes');
}

async function onSave() {
  if (!form.value.name || !form.value.name.trim()) {
    ElMessage.error('请输入名称');
    return;
  }
  if (!form.value.majorId) {
    ElMessage.error('请选择专业');
    return;
  }
  if (!form.value.ownerId) {
    ElMessage.error('请选择班主任');
    return;
  }
  saving.value = true;
  try {
    if (isCreating.value) {
      await api.classesApi.classesCreate({
        name: form.value.name,
        ownerId: form.value.ownerId,
        majorId: form.value.majorId,
      } as ClassDto);
      ElMessage.success('创建成功');
      goBack();
    } else if (id.value) {
      await api.classesApi.classesUpdate(id.value, {
        id: id.value,
        name: form.value.name,
        ownerId: form.value.ownerId,
        majorId: form.value.majorId,
      } as ClassDto);
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
    await api.classesApi.classesDelete(id.value);
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
