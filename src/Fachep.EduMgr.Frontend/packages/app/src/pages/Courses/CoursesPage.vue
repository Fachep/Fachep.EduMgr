<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { CourseDto } from '@edumgr/openapi';
import { useCoursesStore } from '@/stores/entities/courses';
import { fetchSubjectsMap, fetchTeachersMap } from '@/clients/range';
import { useTimetableStore } from '@/stores/timetable';
import { PAGE_SIZE } from '@/constants/pagination';
import { useUserProfileStore } from '@/stores/profile';
import { ElMessage } from 'element-plus';
import ResourceList from '@/components/list/ResourceList.vue';
import { api } from '@/clients';

const router = useRouter();
const route = useRoute();
const profileStore = useUserProfileStore();
const items = ref<CourseDto[]>([]);
const loading = ref(false);
const page = ref(1);
const total = ref(0);
const enrolledCourseIds = ref<Set<number>>(new Set());
const enrollingCourseIds = ref<Set<number>>(new Set());

const subjectMap = ref<Map<string, string>>(new Map());
const teacherMap = ref<Map<string, string>>(new Map());
const deletingIds = ref<Set<number>>(new Set());
const urlFilters = ref({
  subjectId: null as number | null,
  teacherId: null as number | null,
});
const filters = ref({
  subjectName: '' as string,
  locked: null as boolean | null,
});

const showDetail = ref(false);
const selectedItem = ref<Record<string, unknown> | null>(null);
const canCreate = computed(() => profileStore.isAdmin || profileStore.isTeacher);
const showLockedFilter = computed(() => !profileStore.isStudent);

const baseColumns = [
  { key: 'id', label: 'Id', width: '80px' },
  { key: 'subjectId', label: '学科' },
  { key: 'teacherId', label: '教师' },
  { key: 'locked', label: '锁定', width: '80px' },
];
const displayColumns = computed(() =>
  profileStore.isStudent ? baseColumns.filter((c) => c.key !== 'locked') : baseColumns,
);
function initFiltersFromRoute() {
  const query = route.query;
  urlFilters.value.subjectId = query.subjectId ? Number(query.subjectId) : null;
  urlFilters.value.teacherId = query.teacherId ? Number(query.teacherId) : null;
  filters.value.locked = null;
}
function resetTempFilters() {
  filters.value.subjectName = '';
  filters.value.locked = null;
}
async function load(p = 1) {
  loading.value = true;
  try {
    const offset = (p - 1) * PAGE_SIZE;
    let coursesResp: CourseDto[] | undefined = undefined;

    const cs = useCoursesStore();
    const subjectId = urlFilters.value.subjectId || undefined;
    const teacherIdFromUrl = urlFilters.value.teacherId || undefined;
    const subjectName = filters.value.subjectName || undefined;
    const locked = profileStore?.isStudent
      ? false
      : filters.value.locked !== null
        ? filters.value.locked
        : undefined;
    if (profileStore?.isStudent && profileStore.profile?.id != null) {
      const ttStore = useTimetableStore();
      const enrolledIds = await ttStore.loadStudentEnrollments(profileStore.profile.id);
      enrolledCourseIds.value = new Set(enrolledIds || []);
      coursesResp = await cs.coursesPage(
        PAGE_SIZE,
        offset,
        undefined,
        teacherIdFromUrl,
        subjectId,
        subjectName,
        locked,
      );
    } else if (profileStore?.isTeacher && profileStore.profile?.id != null) {
      coursesResp = await cs.coursesPage(
        PAGE_SIZE,
        offset,
        undefined,
        profileStore.profile.id,
        subjectId,
        subjectName,
        locked,
      );
    } else {
      coursesResp = await cs.coursesPage(
        PAGE_SIZE,
        offset,
        undefined,
        teacherIdFromUrl,
        subjectId,
        subjectName,
        locked,
      );
    }

    items.value = coursesResp || [];
    try {
      const subjectIds = Array.from(
        new Set(
          (items.value || [])
            .map((r: CourseDto) => r.subjectId)
            .filter((x): x is number => x != null),
        ),
      );
      const teacherIds = Array.from(
        new Set(
          (items.value || [])
            .map((r: CourseDto) => r.teacherId)
            .filter((x): x is number => x != null),
        ),
      );

      const [sm, tm] = await Promise.all([
        fetchSubjectsMap(subjectIds),
        fetchTeachersMap(teacherIds),
      ]);
      subjectMap.value = sm;
      teacherMap.value = tm;
    } catch {
      subjectMap.value = new Map();
      teacherMap.value = new Map();
    }
    try {
      const teacherId =
        profileStore?.isTeacher && profileStore.profile?.id != null
          ? profileStore.profile.id
          : teacherIdFromUrl;
      total.value = await cs.coursesCount(teacherId || undefined, subjectId, subjectName, locked);
    } catch {
      if ((items.value?.length ?? 0) < PAGE_SIZE) {
        total.value = (p - 1) * PAGE_SIZE + (items.value?.length ?? 0);
      } else {
        total.value = p * PAGE_SIZE + 1;
      }
    }

    page.value = p;
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
}
function openDetail(item: Record<string, unknown>) {
  if (canCreate.value && item.id) {
    router.push(`/courses/${item.id}/manage`);
  } else {
    selectedItem.value = item;
    showDetail.value = true;
  }
}

function handleFilter() {
  page.value = 1;
  void load(1);
}

function resetFilters() {
  resetTempFilters();
  page.value = 1;
  void load(1);
}

async function enrollCourse(courseId?: number) {
  if (!profileStore?.isStudent || !profileStore.profile?.id || !courseId) return;
  if (enrolledCourseIds.value.has(courseId) || enrollingCourseIds.value.has(courseId)) return;

  const nextLoading = new Set(enrollingCourseIds.value);
  nextLoading.add(courseId);
  enrollingCourseIds.value = nextLoading;

  try {
    await api.enrollmentsApi.enrollmentsCreateWithHttpInfo(profileStore.profile.id, courseId);
    const ttStore = useTimetableStore();
    ttStore.clearStudentCache(profileStore.profile.id);
    const refreshed = await ttStore.loadStudentEnrollments(profileStore.profile.id);
    enrolledCourseIds.value = new Set(refreshed || []);
    ElMessage.success('选课成功');
    await load(page.value);
  } catch (e) {
    console.error('enrollCourse error', e);
    ElMessage.error('选课失败');
  } finally {
    const next = new Set(enrollingCourseIds.value);
    next.delete(courseId);
    enrollingCourseIds.value = next;
  }
}

async function deleteCourse(courseId?: number) {
  if (!canCreate.value || !courseId) return;
  if (deletingIds.value.has(courseId)) return;

  deletingIds.value.add(courseId);
  try {
    await api.coursesApi.coursesDelete(courseId);
    const cs = useCoursesStore();
    cs.clear();
    ElMessage.success('删除成功');
    await load(page.value);
  } catch (e) {
    console.error('deleteCourse error', e);
    ElMessage.error('删除失败');
  } finally {
    deletingIds.value.delete(courseId);
  }
}
onMounted(() => {
  initFiltersFromRoute();
  void load(1);
});
watch(
  () => route.query,
  () => {
    initFiltersFromRoute();
    page.value = 1;
    void load(1);
  },
  { deep: true },
);
</script>

<template>
  <div v-loading="loading">
    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
      "
    >
      <h3>课程</h3>
      <div>
        <el-button :loading="loading" @click="() => load(page)">刷新</el-button>
      </div>
    </div>

    <div
      style="display: flex; gap: 12px; align-items: flex-end; margin-bottom: 16px; flex-wrap: wrap"
    >
      <div style="flex: 1; min-width: 200px">
        <label style="display: block; margin-bottom: 6px; font-size: 14px; color: #606266"
          >学科</label
        >
        <el-input
          v-model="filters.subjectName"
          clearable
          placeholder="搜索学科名称"
          style="width: 100%"
        />
      </div>
      <div v-if="showLockedFilter" style="flex: 1; min-width: 200px">
        <label style="display: block; margin-bottom: 6px; font-size: 14px; color: #606266"
          >锁定状态</label
        >
        <el-select v-model="filters.locked" clearable placeholder="全部状态" style="width: 100%">
          <el-option :value="true" label="已锁定" />
          <el-option :value="false" label="未锁定" />
        </el-select>
      </div>
      <el-button :loading="loading" type="primary" @click="handleFilter">筛选</el-button>
      <el-button v-if="filters.subjectName || filters.locked !== null" @click="resetFilters"
        >重置</el-button
      >
    </div>

    <ResourceList
      :clickableRow="false"
      :columns="displayColumns"
      :items="items"
      :showIndex="false"
      rowKey="id"
    >
      <template #cell-subjectId="{ item }">{{
        subjectMap.get(String(item.subjectId)) ?? item.subjectId
      }}</template>
      <template #cell-teacherId="{ item }">{{
        teacherMap.get(String(item.teacherId)) ?? item.teacherId
      }}</template>
      <template v-if="!profileStore.isStudent" #cell-locked="{ item }"
        ><el-checkbox :model-value="!!item.locked" disabled
      /></template>
      <template #actions="{ item }">
        <el-button v-if="!profileStore.isStudent" type="text" @click="() => openDetail(item)">{{
          canCreate ? '管理' : '查看详情'
        }}</el-button>
        <el-button
          v-if="!profileStore.isStudent && canCreate"
          :disabled="deletingIds.has(item.id)"
          :loading="deletingIds.has(item.id)"
          link
          type="text"
          @click="() => deleteCourse(item.id)"
        >
          删除
        </el-button>
        <el-button
          v-if="profileStore.isStudent"
          :disabled="enrolledCourseIds.has(item.id) || enrollingCourseIds.has(item.id)"
          :loading="enrollingCourseIds.has(item.id)"
          link
          type="primary"
          @click="() => enrollCourse(item.id)"
        >
          {{ enrolledCourseIds.has(item.id) ? '已选' : '选课' }}
        </el-button>
      </template>
    </ResourceList>

    <el-dialog v-model:visible="showDetail" title="课程 详情" width="640px">
      <div v-if="selectedItem">
        <p><strong>Id:</strong> {{ selectedItem.id }}</p>
        <p>
          <strong>学科:</strong>
          {{ subjectMap.get(String(selectedItem.subjectId)) ?? selectedItem.subjectId }}
        </p>
        <p>
          <strong>教师:</strong>
          {{ teacherMap.get(String(selectedItem.teacherId)) ?? selectedItem.teacherId }}
        </p>
        <p><strong>锁定:</strong> <el-checkbox :model-value="!!selectedItem.locked" disabled /></p>
      </div>
      <template #footer>
        <el-button @click="showDetail = false">关闭</el-button>
      </template>
    </el-dialog>

    <div style="display: flex; justify-content: flex-end; margin-top: 12px">
      <el-pagination
        v-model:current-page="page"
        :page-size="PAGE_SIZE"
        :total="total"
        background
        layout="prev, pager, next"
        @current-change="(p) => load(p)"
      />
    </div>
  </div>
</template>
