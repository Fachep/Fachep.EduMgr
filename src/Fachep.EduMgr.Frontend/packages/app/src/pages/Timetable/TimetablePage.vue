<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { TimetableGrid } from '@/components';
import { useTimetableStore } from '@/stores/timetable';
import { useConfigStore } from '@/stores/config';
import { fetchCoursesMap, fetchSubjectsMap, fetchTeachersMap } from '@/clients/range';
import type { CourseDto, ScheduleDto } from '@edumgr/openapi';

const route = useRoute();
const router = useRouter();
const ttStore = useTimetableStore();
const cfgStore = useConfigStore();

const loading = ref(false);
const schedules = ref<ScheduleDto[]>([]);
const courseMap = ref<Map<string, string>>(new Map());
const courseInfoMap = ref<Map<string, CourseDto>>(new Map());
const teacherMap = ref<Map<string, string>>(new Map());
const subjectMap = ref<Map<string, string>>(new Map());
const queryType = ref<'student' | 'teacher' | 'course'>('student');
const studentId = ref<number | null>(null);
const teacherId = ref<number | null>(null);
const courseId = ref<number | null>(null);

async function loadForStudent(id: number) {
  loading.value = true;
  try {
    const courseIds = await ttStore.loadStudentEnrollments(id);
    if (!courseIds || !courseIds.length) {
      schedules.value = [];
      return;
    }
    courseMap.value = await fetchCoursesMap(courseIds);
    const coursesResp = await ttStore.loadCoursesRange(courseIds);
    const cim = new Map<string, CourseDto>();
    for (const c of coursesResp || []) if (c && c.id != null) cim.set(String(c.id), c as CourseDto);
    courseInfoMap.value = cim;
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
    const [tm, subj] = await Promise.all([
      fetchTeachersMap(teacherIds),
      fetchSubjectsMap(subjectIds),
    ]);
    teacherMap.value = tm;
    subjectMap.value = subj;
    schedules.value = await ttStore.loadStudentSchedules(id);
  } catch (err) {
    console.error('loadForStudent error', err);
    schedules.value = [];
  } finally {
    loading.value = false;
  }
}

async function loadForTeacher(id: number) {
  loading.value = true;
  try {
    const courses = await ttStore.loadTeacherCourses(id);
    const courseIds = Array.from(
      new Set((courses || []).map((c) => c.id).filter((x): x is number => x != null)),
    );
    if (!courseIds || !courseIds.length) {
      schedules.value = [];
      return;
    }
    courseMap.value = await fetchCoursesMap(courseIds);
    const cim = new Map<string, CourseDto>();
    for (const c of courses || []) if (c && c.id != null) cim.set(String(c.id), c as CourseDto);
    courseInfoMap.value = cim;
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
    const [tm, subj] = await Promise.all([
      fetchTeachersMap(teacherIds),
      fetchSubjectsMap(subjectIds),
    ]);
    teacherMap.value = tm;
    subjectMap.value = subj;
    schedules.value = await ttStore.loadTeacherSchedules(id);
  } catch (err) {
    console.error('loadForTeacher error', err);
    schedules.value = [];
  } finally {
    loading.value = false;
  }
}

async function loadForCourse(id: number) {
  loading.value = true;
  try {
    courseMap.value = await fetchCoursesMap([id]);
    const coursesResp = await ttStore.loadCoursesRange([id]);
    const cim = new Map<string, CourseDto>();
    for (const c of coursesResp || []) if (c && c.id != null) cim.set(String(c.id), c as CourseDto);
    courseInfoMap.value = cim;
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
    const [tm, subj] = await Promise.all([
      fetchTeachersMap(teacherIds),
      fetchSubjectsMap(subjectIds),
    ]);
    teacherMap.value = tm;
    subjectMap.value = subj;
    schedules.value = await ttStore.loadSchedulesForCourseIds([id]);
  } catch (err) {
    console.error('loadForCourse error', err);
    schedules.value = [];
  } finally {
    loading.value = false;
  }
}
function onQuery() {
  const params: Record<string, string> = {};
  if (queryType.value === 'student' && studentId.value) {
    params.studentId = String(studentId.value);
    loadForStudent(studentId.value);
  } else if (queryType.value === 'teacher' && teacherId.value) {
    params.teacherId = String(teacherId.value);
    loadForTeacher(teacherId.value);
  } else if (queryType.value === 'course' && courseId.value) {
    params.courseId = String(courseId.value);
    loadForCourse(courseId.value);
  }
  router.replace({ query: params });
}

onMounted(async () => {
  try {
    await cfgStore.loadConfig();
    const q = route.query;
    if (q.studentId) {
      const sid = Number(q.studentId);
      if (!Number.isNaN(sid)) {
        queryType.value = 'student';
        studentId.value = sid;
        await loadForStudent(sid);
      }
    } else if (q.teacherId) {
      const tid = Number(q.teacherId);
      if (!Number.isNaN(tid)) {
        queryType.value = 'teacher';
        teacherId.value = tid;
        await loadForTeacher(tid);
      }
    } else if (q.courseId) {
      const cid = Number(q.courseId);
      if (!Number.isNaN(cid)) {
        queryType.value = 'course';
        courseId.value = cid;
        await loadForCourse(cid);
      }
    }
  } catch (err) {
    console.error('TimetablePage load error', err);
  }
});
</script>

<template>
  <div v-loading="loading">
    <div class="page-header">
      <h3>课表查询</h3>
    </div>

    <el-card style="margin-bottom: 16px">
      <el-form :inline="true">
        <el-form-item label="查询类型">
          <el-radio-group v-model="queryType">
            <el-radio value="student">学生</el-radio>
            <el-radio value="teacher">教师</el-radio>
            <el-radio value="course">课程</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-if="queryType === 'student'" label="学生ID">
          <el-input-number
            v-model="studentId"
            :controls="false"
            :min="1"
            placeholder="请输入学生ID"
            style="width: 200px"
          />
        </el-form-item>

        <el-form-item v-if="queryType === 'teacher'" label="教师ID">
          <el-input-number
            v-model="teacherId"
            :controls="false"
            :min="1"
            placeholder="请输入教师ID"
            style="width: 200px"
          />
        </el-form-item>

        <el-form-item v-if="queryType === 'course'" label="课程ID">
          <el-input-number
            v-model="courseId"
            :controls="false"
            :min="1"
            placeholder="请输入课程ID"
            style="width: 200px"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onQuery">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <template v-if="schedules && schedules.length">
      <TimetableGrid
        :courseInfoMap="courseInfoMap"
        :courseMap="courseMap"
        :schedules="schedules"
        :sectionOrder="cfgStore.sectionOrder"
        :sectionTimes="cfgStore.sectionTimes"
        :sections="cfgStore.sections ?? 8"
        :subjectMap="subjectMap"
        :teacherMap="teacherMap"
      />
    </template>
    <template v-else-if="!loading">
      <el-empty description="请输入学生ID、教师ID或课程ID查询课表" />
    </template>
  </div>
</template>

<style scoped></style>
