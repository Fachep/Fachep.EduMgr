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
      <h3>排课</h3>
      <div>
        <el-button :loading="loading" @click="load(page)">刷新</el-button>
      </div>
    </div>

    <div class="timetable-wrap">
      <el-table
        :data="coursesRows"
        row-key="course.id"
        :style="{ width: '100%' }"
        border
        class="timetable-table"
      >
        <el-table-column fixed="left" label="课程" width="260">
          <template #default="{ row }">
            <div style="font-weight: 700">
              {{ courseMap.get(String(row.course.id)) ?? row.course.id }}
            </div>
            <div style="font-size: 12px; color: #666; margin-top: 4px">
              <span v-if="row.course.subjectId">{{
                subjectMap.get(String(row.course.subjectId)) ?? ''
              }}</span>
              <span v-if="row.course.teacherId">
                / {{ teacherMap.get(String(row.course.teacherId)) ?? '' }}</span
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column v-for="(d, di) in days" :key="di" :label="d">
          <el-table-column
            v-for="si in sectionsArray"
            :key="si"
            :label="
              String(
                cfgStore.sectionOrder && cfgStore.sectionOrder.length
                  ? cfgStore.sectionOrder[si]
                  : si + 1,
              )
            "
            :min-width="colMinWidth(di, si)"
          >
            <template #default="{ row }">
              <div
                v-if="
                  row.daySlots &&
                  row.daySlots[di] &&
                  row.daySlots[di][si] &&
                  row.daySlots[di][si].length
                "
              >
                <div v-for="(entry, ei) in row.daySlots[di][si]" :key="ei" class="timetable-entry">
                  <div class="timetable-entry__meta">{{ entry.location }}</div>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog v-model:visible="showCourseDetail" title="课程 详情" width="640px">
      <div v-if="selectedCourse">
        <p><strong>Id:</strong> {{ selectedCourse.id }}</p>
        <p>
          <strong>名称:</strong> {{ courseMap.get(String(selectedCourse.id)) ?? selectedCourse.id }}
        </p>
        <p>
          <strong>学科:</strong>
          {{ subjectMap.get(String(selectedCourse.subjectId)) ?? selectedCourse.subjectId }}
        </p>
        <p>
          <strong>教师:</strong>
          {{ teacherMap.get(String(selectedCourse.teacherId)) ?? selectedCourse.teacherId }}
        </p>
      </div>
      <template #footer>
        <el-button @click="showCourseDetail = false">关闭</el-button>
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

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import type { CourseDto, ScheduleDto } from '@edumgr/openapi';
import { fetchCoursesMap, fetchSubjectsMap, fetchTeachersMap } from '@/clients/range';
import { PAGE_SIZE } from '@/constants/pagination';
import { useUserProfileStore } from '@/stores/profile';
import { useTimetableStore } from '@/stores/timetable';
import { useConfigStore } from '@/stores/config';
import { coursesApi } from '@/clients/api';

const items = ref<ScheduleDto[]>([]);
const loading = ref(false);
const page = ref(1);
const total = ref(0);

const profileStore = useUserProfileStore();
const cfgStore = useConfigStore();

const courseMap = ref<Map<string, string>>(new Map());
const teacherMap = ref<Map<string, string>>(new Map());
const subjectMap = ref<Map<string, string>>(new Map());
const courseInfoMap = ref<Map<string, CourseDto>>(new Map());
const enrolledCourseIds = ref<number[]>([]);
const showCourseDetail = ref(false);
const selectedCourse = ref<CourseDto | null>(null);

async function load(p = 1) {
  loading.value = true;
  try {
    try {
      const cfgStore = useConfigStore();
      await cfgStore.loadConfig();
      if (cfgStore.sections != null) configSections.value = cfgStore.sections as number | null;
    } catch {}
    const offset = (p - 1) * PAGE_SIZE;
    const tt = useTimetableStore();
    let coursesResp: Array<CourseDto> | undefined = undefined;
    if (profileStore.isStudent && profileStore.profile?.id != null) {
      const courseIds = await tt.loadStudentEnrollments(profileStore.profile.id);
      if (courseIds && courseIds.length)
        coursesResp = await tt.loadCoursesRange(courseIds as number[]);
      else coursesResp = [];
      enrolledCourseIds.value = courseIds || [];
    } else if (profileStore.isTeacher && profileStore.profile?.id != null) {
      coursesResp = await tt.loadTeacherCourses(profileStore.profile.id);
    } else {
      const pageResult = await coursesApi.coursesPage(PAGE_SIZE, offset);
      coursesResp = pageResult || [];
    }
    const cim = new Map<string, CourseDto>();
    const cname = new Map<string, string>();
    const courseIds: number[] = [];
    for (const c of coursesResp || []) {
      if (c && c.id != null) {
        cim.set(String(c.id), c as CourseDto);
        cname.set(String(c.id), `课程 ${c.id}`);
        courseIds.push(c.id as number);
      }
    }
    courseInfoMap.value = cim;
    courseMap.value = cname;

    const allSchedules = await tt.loadSchedulesForCourseIds(courseIds);
    items.value = allSchedules;
    try {
      const courseIdsSet = new Set<number>();
      for (const r of items.value || []) {
        if (r.courseId != null) courseIdsSet.add(r.courseId);
      }
      const courseIds = Array.from(courseIdsSet);

      const cm = await fetchCoursesMap(courseIds);
      courseMap.value = cm;

      const coursesResp = await tt.loadCoursesRange(courseIds as number[]);
      const cim2 = new Map<string, CourseDto>();
      const cname2 = new Map<string, string>();
      for (const c of coursesResp || []) {
        if (c && c.id != null) {
          cim2.set(String(c.id), c as CourseDto);
          cname2.set(String(c.id), `课程 ${c.id}`);
        }
      }
      courseInfoMap.value = cim2;
      for (const [k, v] of cname2) courseMap.value.set(k, v);

      const teacherIds = Array.from(
        new Set(
          Array.from(cim2.values())
            .map((c) => c.teacherId)
            .filter((x): x is number => x != null),
        ),
      );
      const subjectIds = Array.from(
        new Set(
          Array.from(cim2.values())
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
      courseMap.value = new Map();
      teacherMap.value = new Map();
      subjectMap.value = new Map();
      courseInfoMap.value = new Map();
    }

    try {
      if (profileStore.isStudent && profileStore.profile?.id != null) {
        total.value = coursesResp?.length ?? 0;
      } else if (profileStore.isTeacher && profileStore.profile?.id != null) {
        total.value = await coursesApi.coursesCount(profileStore.profile.id);
      } else {
        total.value = await coursesApi.coursesCount();
      }
    } catch {
      total.value = coursesResp?.length ?? items.value?.length ?? 0;
    }
    page.value = p;
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  try {
    await cfgStore.loadConfig();
  } catch {}
  load(1);
});

const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

const configSections = ref<number | null>(null);
const maxSection = computed(() => {
  let ms = 0;
  for (const s of items.value || []) {
    if (s.sections) {
      for (const r of s.sections as Array<number | number[]>) {
        let end = 0;
        if (Array.isArray(r)) {
          if (r.length > 1) end = Number(r[1]);
          else end = Number(r[0]) + 1;
        } else if (typeof r === 'number') {
          end = Number(r) + 1;
        }
        if (Number.isFinite(end) && end > ms) ms = end;
      }
    }
  }
  if (ms <= 0) ms = configSections.value ?? 8;
  if (configSections.value != null) ms = Math.max(ms, configSections.value);
  return ms;
});
const displaySections = computed(() => {
  if (cfgStore.sectionTimes && cfgStore.sectionTimes.length > 0)
    return cfgStore.sectionTimes.length;
  return Math.max(12, maxSection.value || 0, configSections.value ?? 12);
});
const sectionsArray = computed(() => Array.from({ length: displaySections.value }, (_, i) => i));

type Entry = {
  schedule: ScheduleDto;
  courseName: string;
  teacherName?: string;
  subjectName?: string;
  weeks?: string;
  location?: string;
};
function weeksLabel(weeks: Array<Array<number>> | undefined | null) {
  if (!weeks || !weeks.length) return '';
  return weeks
    .map((r) => {
      if (!r || !r.length) return '';
      if (r.length >= 2) {
        const a = Number(r[0]) + 1;
        const b = Number(r[1]);
        if (b === Number(r[0]) + 1) return `${a}`;
        return `${a}-${b}`;
      }
      const a = Number(r[0]) + 1;
      return `${a}`;
    })
    .join(',');
}

const coursesRows = computed(() => {
  const sections = displaySections.value;
  const courses = Array.from(courseInfoMap.value.values() || []);
  const visibleCourses = courses.filter((c) => {
    if (profileStore.isAdmin) return true;
    if (profileStore.isTeacher && profileStore.profile?.id)
      return c.teacherId === profileStore.profile.id;
    if (profileStore.isStudent && profileStore.profile?.id)
      return enrolledCourseIds.value.includes(c.id as number);
    return true;
  });

  return visibleCourses.map((c) => {
    const orderArr =
      cfgStore.sectionOrder && cfgStore.sectionOrder.length
        ? cfgStore.sectionOrder
        : Array.from({ length: sections }, (_, i) => i + 1);
    const displayIndexMap = new Map<number, number>();
    for (let i = 0; i < orderArr.length; i++) {
      const key = Number(orderArr[i]) - 1;
      displayIndexMap.set(key, i);
    }
    const daySlots: Entry[][][] = Array.from({ length: 7 }, () =>
      Array.from({ length: orderArr.length }, () => [] as Entry[]),
    );
    for (const s of items.value || []) {
      if (s.courseId !== c.id) continue;
      if (!s.days || !s.sections) continue;
      const cname = courseMap.value.get(String(c.id)) ?? `课程 ${c.id}`;
      const teacherName = c.teacherId ? (teacherMap.value.get(String(c.teacherId)) ?? '') : '';
      const subjectName = c.subjectId ? (subjectMap.value.get(String(c.subjectId)) ?? '') : '';
      for (const dr of s.days as Array<number[]>) {
        const dstart = dr && dr.length > 0 ? Number(dr[0]) : 0;
        const dend = dr && dr.length > 1 ? Number(dr[1]) : dstart + 1;
        for (let d = dstart; d < dend; d++) {
          const dayIdx = d;
          if (dayIdx < 0 || dayIdx >= days.length) continue;
          for (const sr of s.sections as Array<number[]>) {
            const sstart = sr && sr.length > 0 ? Number(sr[0]) : 0;
            const send = sr && sr.length > 1 ? Number(sr[1]) : sstart + 1;
            for (let orig = sstart; orig < send; orig++) {
              const slotIdx = displayIndexMap.get(orig as number);
              if (slotIdx == null) continue;
              daySlots[dayIdx]![slotIdx]!.push({
                schedule: s,
                courseName: cname,
                teacherName,
                subjectName,
                weeks: weeksLabel(s.weeks),
                location: s.location ?? '',
              });
            }
          }
        }
      }
    }
    return { course: c, daySlots };
  });
});
const columnHasEntry = computed(() => {
  const cols: boolean[][] = Array.from({ length: days.length }, () =>
    Array.from({ length: displaySections.value }, () => false),
  );
  for (const row of coursesRows.value || []) {
    for (let di = 0; di < days.length; di++) {
      for (let si = 0; si < displaySections.value; si++) {
        if (row?.daySlots?.[di]?.[si]?.length) cols[di]![si] = true;
      }
    }
  }
  return cols;
});

function colMinWidth(di: number, si: number) {
  try {
    return columnHasEntry.value[di] && columnHasEntry.value[di][si] ? 180 : 72;
  } catch {
    return 72;
  }
}
</script>

<style scoped>
.timetable-wrap {
  width: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.timetable-table {
  border-collapse: collapse;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  min-width: 960px;
  table-layout: fixed;
}
.timetable-table thead th {
  background: #fafafa;
  border-bottom: 1px solid #eaeaea;
  padding: 10px 12px;
  font-weight: 600;
  text-align: center;
  vertical-align: middle;
  top: 0;
}
.timetable-table tbody td {
  border-bottom: 1px solid #f3f4f6;
  border-right: 1px solid #f3f4f6;
  padding: 10px;
  vertical-align: top;
  min-height: 56px;
}

.timetable-table thead th {
  position: sticky;
  z-index: 3;
}

.timetable-table th:first-child,
.timetable-table td:first-child {
  position: sticky;
  left: 0;
  background: #fff;
  z-index: 4;
}
.timetable-td {
  padding: 6px;
}
.timetable-entry {
  background: #f0f9ff;
  border: 1px solid #e6f7ff;
  padding: 8px;
  margin-bottom: 6px;
  border-radius: 6px;
  white-space: nowrap;
  max-height: 3.6em;
}
.timetable-entry__title {
  font-weight: 700;
}
.timetable-entry__meta {
  font-size: 12px;
  color: #666;
}
.day-header-sections {
  display: flex;
  gap: 6px;
  justify-content: center;
  margin-top: 6px;
  flex-wrap: wrap;
}
.day-header-section {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  font-size: 11px;
  background: #f5f7fa;
  border-radius: 3px;
  border: 1px solid #e6eef9;
}
.timetable-table th,
.timetable-table td {
  vertical-align: top;
  overflow: hidden;
  word-break: break-word;
}
.timetable-table td {
  min-width: 120px;
}

@media (max-width: 760px) {
  .timetable-entry {
    padding: 6px;
    font-size: 13px;
  }
  .timetable-table td {
    min-width: 100px;
  }
  .timetable-table {
    min-width: 820px;
  }
}
</style>
