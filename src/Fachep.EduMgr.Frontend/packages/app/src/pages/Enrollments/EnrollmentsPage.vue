<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import type { CourseDto, EnrollmentDto } from '@edumgr/openapi';
import { useEnrollmentsStore } from '@/stores/entities/enrollments';
import { fetchStudentsMap, fetchSubjectsMap, fetchTeachersMap } from '@/clients/range';
import { useTimetableStore } from '@/stores/timetable';
import { PAGE_SIZE } from '@/constants/pagination';
import { useUserProfileStore } from '@/stores/profile';
import { ElMessage } from 'element-plus';
import ResourceList from '@/components/list/ResourceList.vue';
import { api } from '@/clients';

const items = ref<EnrollmentDto[]>([]);
const loading = ref(false);
const page = ref(1);
const total = ref(0);

async function load(p = 1) {
  loading.value = true;
  try {
    const offset = (p - 1) * PAGE_SIZE;
    const studentIdParam =
      profileStore.isStudent && profileStore.profile?.id != null
        ? profileStore.profile.id
        : undefined;
    const es = useEnrollmentsStore();
    const resp = await es.enrollmentsPage(PAGE_SIZE, offset, undefined, studentIdParam);
    items.value = (resp as EnrollmentDto[]) || [];
    try {
      const studentIdsSet = new Set<number>();
      const courseIdsSet = new Set<number>();
      for (const r of items.value || []) {
        if (r.studentId != null) studentIdsSet.add(r.studentId);
        if (r.courseId != null) courseIdsSet.add(r.courseId);
      }
      const studentIds = Array.from(studentIdsSet);
      const courseIds = Array.from(courseIdsSet);

      const sm = await fetchStudentsMap(studentIds);
      const tt = useTimetableStore();
      const coursesResp = await tt.loadCoursesRange(courseIds as number[]);
      studentMap.value = sm;

      const cim = new Map<string, CourseDto>();
      const cname = new Map<string, string>();
      for (const c of coursesResp || []) {
        if (c && c.id != null) {
          cim.set(String(c.id), c as CourseDto);
          cname.set(String(c.id), `课程 ${c.id}`);
        }
      }
      courseInfoMap.value = cim;
      courseMap.value = cname;

      const teacherIds = Array.from(
        new Set(
          Array.from(cim.values())
            .map((c) => c.teacherId)
            .filter((x): x is number => x != null),
        ),
      );
      const subjectIds = Array.from(
        new Set(
          Array.from(cim.values())
            .map((c) => c.subjectId)
            .filter((x): x is number => x != null),
        ),
      );
      const [tm, sm2] = await Promise.all([
        fetchTeachersMap(teacherIds),
        fetchSubjectsMap(subjectIds),
      ]);
      teacherMap.value = tm;
      subjectMap.value = sm2;
    } catch {
      studentMap.value = new Map();
      courseMap.value = new Map();
      teacherMap.value = new Map();
      subjectMap.value = new Map();
      courseInfoMap.value = new Map();
    }
    try {
      const studentIdParam =
        profileStore.isStudent && profileStore.profile?.id != null
          ? profileStore.profile.id
          : undefined;
      total.value = await es.enrollmentsCount(studentIdParam);
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

onMounted(() => load(1));
const profileStore = useUserProfileStore();
const studentMap = ref<Map<string, string>>(new Map());
const courseMap = ref<Map<string, string>>(new Map());
const teacherMap = ref<Map<string, string>>(new Map());
const subjectMap = ref<Map<string, string>>(new Map());
const courseInfoMap = ref<Map<string, CourseDto>>(new Map());
const deletingIds = ref<Set<string>>(new Set());

async function deleteEnrollment(item: EnrollmentDto) {
  if (!item.studentId || !item.courseId) return;
  const courseInfo = courseInfoMap.value.get(String(item.courseId));
  const isLocked = courseInfo?.locked ?? false;
  if (isLocked) {
    ElMessage.warning('不能删除已锁定的课程');
    return;
  }

  const key = `${item.studentId}:${item.courseId}`;
  deletingIds.value.add(key);

  try {
    await api.enrollmentsApi.enrollmentsDelete(item.studentId, item.courseId);
    const ttStore = useTimetableStore();
    if (profileStore.isStudent && profileStore.profile?.id != null) {
      ttStore.clearStudentCache(profileStore.profile.id);
    }
    ElMessage.success('删除成功');
    await load(page.value);
  } catch (e) {
    console.error('deleteEnrollment error', e);
    ElMessage.error('删除失败');
  } finally {
    deletingIds.value.delete(key);
  }
}
</script>

<template>
  <div v-loading="loading">
    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
      "
    >
      <h3>选课</h3>
      <div>
        <el-button :loading="loading" @click="() => load(page)">刷新</el-button>
      </div>
    </div>

    <ResourceList
      :clickableRow="false"
      :columns="[
        { key: 'studentId', label: '学生' },
        { key: 'courseId', label: '课程' },
        { key: 'subject', label: '学科' },
        { key: 'teacher', label: '教师' },
      ]"
      :items="items"
      :loading="loading"
      :showIndex="false"
      rowKey="studentId"
    >
      <template #cell-studentId="{ item }">{{
        studentMap.get(String(item.studentId)) ?? item.studentId
      }}</template>
      <template #cell-courseId="{ item }">{{
        courseMap.get(String(item.courseId)) ?? item.courseId
      }}</template>
      <template #cell-subject="{ item }">{{
        subjectMap.get(String(courseInfoMap.get(String(item.courseId))?.subjectId ?? '')) ?? ''
      }}</template>
      <template #cell-teacher="{ item }">{{
        teacherMap.get(String(courseInfoMap.get(String(item.courseId))?.teacherId ?? '')) ?? ''
      }}</template>
      <template #actions="{ item }">
        <el-button
          :disabled="deletingIds.has(`${item.studentId}:${item.courseId}`)"
          :loading="deletingIds.has(`${item.studentId}:${item.courseId}`)"
          link
          type="text"
          @click="() => deleteEnrollment(item as EnrollmentDto)"
        >
          删除
        </el-button>
      </template>
    </ResourceList>

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

<style scoped></style>
