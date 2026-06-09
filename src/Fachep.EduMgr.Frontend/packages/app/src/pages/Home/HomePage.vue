<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { TimetableGrid } from '@/components';
import { useUserProfileStore } from '@/stores/profile';
import { useTimetableStore } from '@/stores/timetable';
import { useConfigStore } from '@/stores/config';
import { fetchCoursesMap, fetchSubjectsMap, fetchTeachersMap } from '@/clients/range';
import type { CourseDto, MajorDto, ScheduleDto } from '@edumgr/openapi';

const profileStore = useUserProfileStore();
const ttStore = useTimetableStore();
const cfgStore = useConfigStore();

const loading = ref(false);
const schedules = ref<ScheduleDto[]>([]);
const courseMap = ref<Map<string, string>>(new Map());
const courseInfoMap = ref<Map<string, CourseDto>>(new Map());
const teacherMap = ref<Map<string, string>>(new Map());
const subjectMap = ref<Map<string, string>>(new Map());
const className = ref<string | null>(null);
const majorName = ref<string | null>(null);
const departmentName = ref<string | null>(null);

async function loadPersonal() {
  if (!profileStore.profile) return;
  const id = profileStore.profile.id;
  if (!id) return;
  loading.value = true;
  try {
    await cfgStore.loadConfig();
    if (profileStore.isStudent) {
      const tt = ttStore;
      const courseIds = await tt.loadStudentEnrollments(id);
      if (courseIds && courseIds.length) {
        courseMap.value = await fetchCoursesMap(courseIds);
        const coursesResp = await tt.loadCoursesRange(courseIds);
        const cim = new Map<string, CourseDto>();
        for (const c of coursesResp || [])
          if (c && c.id != null) cim.set(String(c.id), c as CourseDto);
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
        schedules.value = await tt.loadStudentSchedules(id);
      } else {
        schedules.value = [];
      }
      try {
        const sid = profileStore.profile.id;
        const crec = await ttStore.loadStudentClass(sid);
        if (crec) {
          className.value = crec?.name ?? null;
          const mid = crec?.majorId;
          if (mid != null) {
            const ms = await import('@/stores/entities/majors').then((m) => m.useMajorsStore());
            const marr = await ms.majorsRange([mid]);
            const mrec: MajorDto | undefined = marr && marr.length ? marr[0] : undefined;
            majorName.value = mrec?.name ?? null;
          }
        }
      } catch (e) {
        console.error('load student class/major', e);
      }
    } else if (profileStore.isTeacher) {
      const tt = ttStore;
      const courses = await tt.loadTeacherCourses(id);
      const courseIds = Array.from(
        new Set((courses || []).map((c) => c.id).filter((x): x is number => x != null)),
      );
      if (courseIds && courseIds.length) {
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
        schedules.value = await tt.loadTeacherSchedules(id);
      } else {
        schedules.value = [];
      }
      try {
        const trec = await ttStore.loadTeacherRecord(id);
        const deptId = trec?.departmentId;
        if (deptId != null) {
          const ds = await import('@/stores/entities/departments').then((m) =>
            m.useDepartmentsStore(),
          );
          const darr = await ds.departmentsRange([deptId]);
          const drec = darr && darr.length ? darr[0] : undefined;
          departmentName.value = drec?.name ?? null;
        }
      } catch (e) {
        console.error('load teacher department', e);
      }
    }
  } catch (err) {
    console.error('loadPersonal error', err);
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  try {
    await cfgStore.loadConfig();
  } catch {}
  await loadPersonal();
});
</script>

<template>
  <div v-if="profileStore && profileStore.profile" v-loading="loading" class="personal-container">
    <main class="left-col">
      <div class="timetable-section">
        <template v-if="profileStore.isStudent || profileStore.isTeacher">
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
        <template v-else-if="profileStore.isAdmin">
          <el-card>
            <h4>系统配置(管理员视图)</h4>
            <pre style="white-space: pre-wrap">{{ JSON.stringify(cfgStore.config, null, 2) }}</pre>
            <el-button
              type="primary"
              @click="
                () => {
                  $router.push('/config');
                }
              "
              >前往系统配置</el-button
            >
          </el-card>
        </template>
        <template v-else>
          <el-empty description="暂无可显示的课表信息" />
        </template>
      </div>
    </main>

    <aside class="right-col">
      <el-card class="profile-card" shadow="never">
        <h4>个人资料</h4>
        <div class="profile-row">
          <label>姓名</label>
          <div>{{ profileStore.profile!.name || '—' }}</div>
        </div>
        <div class="profile-row">
          <label>账号ID</label>
          <div>{{ profileStore.profile!.id ?? '—' }}</div>
        </div>
        <div class="profile-row">
          <label>电子邮件</label>
          <div>{{ profileStore.profile!.email || '—' }}</div>
        </div>
        <div class="profile-row">
          <label>角色</label>
          <div>{{ profileStore.profile!.userRole || '未知' }}</div>
        </div>
        <div v-if="className" class="profile-row">
          <label>班级</label>
          <div>{{ className }}</div>
        </div>
        <div v-if="majorName" class="profile-row">
          <label>专业</label>
          <div>{{ majorName }}</div>
        </div>
        <div v-if="departmentName" class="profile-row">
          <label>学院/部门</label>
          <div>{{ departmentName }}</div>
        </div>
      </el-card>
    </aside>
  </div>

  <div v-else>
    <el-alert title="未登录或没有个人信息" type="warning" />
  </div>
</template>

<style scoped>
.personal-container {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  width: 100%;
}
.left-col {
  flex: 1;
  min-width: 360px;
}
.right-col {
  width: 300px;
}
.timetable-section {
  border: 1px solid #eef2f6;
  padding: 8px;
  border-radius: 8px;
  overflow: auto;
}
.profile-card {
  position: sticky;
  top: 12px;
}
.profile-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #f3f4f6;
}
.profile-row label {
  color: #666;
}
@media (max-width: 900px) {
  .personal-container {
    flex-direction: column;
  }
  .right-col {
    width: 100%;
  }
}
</style>
