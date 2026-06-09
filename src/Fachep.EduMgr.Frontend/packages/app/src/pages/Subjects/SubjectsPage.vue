<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { DepartmentDto, SubjectDto } from '@edumgr/openapi';
import { ElMessage } from 'element-plus';
import { api } from '@/clients';
import { useSubjectsStore } from '@/stores/entities/subjects';
import { useDepartmentsStore } from '@/stores/entities/departments';
import { fetchDepartmentsMap } from '@/clients/range';
import { useTimetableStore } from '@/stores/timetable';
import { useUserProfileStore } from '@/stores/profile';
import ResourceList from '@/components/list/ResourceList.vue';
import { usePagedList } from '@/composables/usePagedList';

const subs = useSubjectsStore();
const departmentsStore = useDepartmentsStore();
const tt = useTimetableStore();
const profileStore = useUserProfileStore();
const departments = ref<DepartmentDto[]>([]);
const loadingDepartments = ref(false);
const newSubjectForm = ref<{ name: string; departmentId: number | undefined }>({
  name: '',
  departmentId: undefined,
});

const { items, loading, page, total, load } = usePagedList<SubjectDto>({
  loadFn: async (limit, offset) => {
    let data: SubjectDto[] = [];
    if (profileStore.isTeacher && profileStore.profile?.id != null) {
      try {
        const trec = await tt.loadTeacherRecord(profileStore.profile.id);
        const deptId = trec?.departmentId;
        if (deptId != null) {
          data = await subs.subjectsPage(limit, offset, undefined, deptId);
        } else {
          data = [];
        }
      } catch {
        data = [];
      }
    } else {
      data = await subs.subjectsPage(limit, offset);
    }
    try {
      const ids = Array.from(
        new Set(
          (data || []).map((r: SubjectDto) => r.departmentId).filter((x): x is number => x != null),
        ),
      );
      departmentMap.value = await fetchDepartmentsMap(ids);
    } catch {
      departmentMap.value = new Map();
    }
    return data;
  },
  countFn: async () => {
    if (profileStore.isTeacher && profileStore.profile?.id != null) {
      try {
        const trec = await tt.loadTeacherRecord(profileStore.profile.id);
        const deptId = trec?.departmentId;
        if (deptId != null) {
          return subs.subjectsCount(undefined, deptId);
        }
        return 0;
      } catch {
        return 0;
      }
    } else {
      return subs.subjectsCount();
    }
  },
  pageSize: 20,
});

const router = useRouter();
const canCreate = computed(() => profileStore.isAdmin);
const canCreateCourse = computed(() => profileStore.isAdmin || profileStore.isTeacher);
const showNew = ref(false);
const saving = ref(false);
const departmentMap = ref<Map<string, string>>(new Map());
const columns = [
  { key: 'id', label: 'Id', width: '80px' },
  { key: 'name', label: '名称' },
  { key: 'departmentId', label: '学院' },
];

async function loadDepartments() {
  if (loadingDepartments.value) return;
  loadingDepartments.value = true;
  try {
    const list = await departmentsStore.departmentsPage();
    departments.value = list;
  } catch (err) {
    console.error(err);
    departments.value = [];
  } finally {
    loadingDepartments.value = false;
  }
}

function resetNewForm() {
  newSubjectForm.value = { name: '', departmentId: undefined };
}

function openCreateDialog() {
  resetNewForm();
  if (!departments.value.length) void loadDepartments();
  showNew.value = true;
}

async function onCreate() {
  if (!newSubjectForm.value.name || !newSubjectForm.value.name.trim()) {
    ElMessage.error('请输入学科名称');
    return;
  }
  if (!newSubjectForm.value.departmentId) {
    ElMessage.error('请选择学院');
    return;
  }
  saving.value = true;
  try {
    await api.subjectsApi.subjectsCreate({
      name: newSubjectForm.value.name.trim(),
      departmentId: newSubjectForm.value.departmentId,
    } as SubjectDto);
    ElMessage.success('创建成功');
    showNew.value = false;
    resetNewForm();
    await load(page.value);
  } catch (err: any) {
    console.error(err);
    ElMessage.error(err?.message || '创建失败');
  } finally {
    saving.value = false;
  }
}
function createCourseForSubject(subjectId?: number) {
  if (!subjectId) return;
  router.push(`/courses/create?subjectId=${subjectId}`);
}

onMounted(() => {
  if (canCreate.value) {
    void loadDepartments();
  }
});
</script>

<template>
  <div v-loading="loading">
    <div class="page-header">
      <h3>学科</h3>
      <div class="page-header-actions">
        <el-button v-if="canCreate" type="primary" @click="openCreateDialog">新建</el-button>
        <el-button :loading="loading" @click="() => load(page)">刷新</el-button>
      </div>
    </div>

    <el-dialog v-model:visible="showNew" title="新建 学科" width="640px" @close="showNew = false">
      <div v-loading="saving">
        <el-form :model="newSubjectForm" label-width="96px">
          <el-form-item label="名称" required>
            <el-input v-model="newSubjectForm.name" placeholder="请输入学科名称" />
          </el-form-item>
          <el-form-item label="学院" required>
            <el-select
              v-model="newSubjectForm.departmentId"
              :loading="loadingDepartments"
              filterable
              placeholder="请选择学院"
            >
              <el-option
                v-for="dept in departments"
                :key="dept.id"
                :label="dept.name"
                :value="dept.id"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button @click="showNew = false">取消</el-button>
        <el-button :loading="saving" type="primary" @click="onCreate">保存</el-button>
      </template>
    </el-dialog>

    <ResourceList
      :clickableRow="false"
      :columns="columns"
      :items="items"
      :showIndex="false"
      rowKey="id"
    >
      <template #cell-departmentId="{ item }">
        {{ departmentMap.get(String(item.departmentId)) ?? item.departmentId }}
      </template>
      <template #actions="{ item }">
        <el-button
          v-if="canCreateCourse"
          link
          type="primary"
          @click="() => createCourseForSubject(item.id)"
        >
          创建课程
        </el-button>
      </template>
    </ResourceList>

    <div class="pagination-container">
      <el-pagination
        v-model:current-page="page"
        :page-size="20"
        :total="total"
        background
        layout="prev, pager, next"
        @current-change="(p) => load(p)"
      />
    </div>
  </div>
</template>

<style scoped></style>
