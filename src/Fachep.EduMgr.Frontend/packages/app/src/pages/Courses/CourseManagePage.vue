<template>
  <div v-loading="loading">
    <div class="page-header">
      <h3>课程管理</h3>
      <el-button :loading="loading" @click="loadCourse">刷新</el-button>
    </div>

    <el-card v-if="course" style="margin-bottom: 16px">
      <template #header>
        <div class="card-header">
          <span>课程信息</span>
          <el-button v-if="canEdit" size="small" type="primary" @click="showEditCourse = true"
            >编辑</el-button
          >
        </div>
      </template>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="课程 ID">{{ course.id }}</el-descriptions-item>
        <el-descriptions-item label="锁定状态">
          <div style="display: flex; align-items: center; gap: 12px">
            <el-tag :type="course.locked ? 'danger' : 'success'">{{
              course.locked ? '已锁定' : '未锁定'
            }}</el-tag>
            <el-popconfirm
              v-if="canEdit && !course.locked"
              cancel-button-text="取消"
              confirm-button-text="确定锁定"
              title="确定锁定此课程？锁定后无法解锁。"
              @confirm="lockCourse"
            >
              <template #reference>
                <el-button size="small" type="danger">锁定课程</el-button>
              </template>
            </el-popconfirm>
            <span v-else-if="course.locked" style="font-size: 12px; color: #999"
              >已锁定，无法解锁</span
            >
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="学科">{{
          subjectMap.get(String(course.subjectId)) ?? course.subjectId
        }}</el-descriptions-item>
        <el-descriptions-item label="教师">{{
          teacherMap.get(String(course.teacherId)) ?? course.teacherId
        }}</el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-card v-if="isCreating" style="margin-bottom: 16px">
      <template #header>
        <div class="card-header">
          <span>创建课程</span>
        </div>
      </template>
      <el-form v-if="editForm" :model="editForm" label-width="100px">
        <el-form-item label="学科" required>
          <el-select v-model="editForm.subjectId" placeholder="请选择学科" style="width: 100%">
            <el-option
              v-for="[id, name] of subjectMap"
              :key="id"
              :label="name"
              :value="Number(id)"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="教师" required>
          <el-select v-model="editForm.teacherId" placeholder="请选择教师" style="width: 100%">
            <el-option
              v-for="[id, name] of availableTeachers"
              :key="id"
              :label="name"
              :value="Number(id)"
            />
          </el-select>
        </el-form-item>
        <el-form-item class="form-actions">
          <el-button :loading="saving" type="primary" @click="createCourse">创建</el-button>
          <el-button @click="goBack">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card>
      <template #header>
        <div class="card-header">
          <span>排课记录</span>
          <el-button
            v-if="canEdit && !isCreating"
            size="small"
            type="primary"
            @click="openNewSchedule"
            >新建排课</el-button
          >
        </div>
      </template>
      <el-table :data="schedules" border style="width: 100%">
        <el-table-column label="ID" prop="id" width="80" />
        <el-table-column label="周次" width="180">
          <template #default="{ row }">{{ formatWeeks(row.weeks) }}</template>
        </el-table-column>
        <el-table-column label="星期" width="180">
          <template #default="{ row }">{{ formatDays(row.days) }}</template>
        </el-table-column>
        <el-table-column label="节次" width="180">
          <template #default="{ row }">{{ formatSections(row.sections) }}</template>
        </el-table-column>
        <el-table-column label="地点" prop="location" />
        <el-table-column fixed="right" label="操作" width="180">
          <template #default="{ row }">
            <el-button type="text" @click="openEditSchedule(row as ScheduleDto)">编辑</el-button>
            <el-popconfirm title="确定删除此排课?" @confirm="deleteSchedule(row.id)">
              <template #reference>
                <el-button class="btn-text-danger" type="text">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      v-model="showEditCourse"
      :title="isCreating ? '编建课程' : '编辑课程信息'"
      width="600px"
    >
      <el-form v-if="editForm" :model="editForm" label-width="100px">
        <el-form-item label="学科">
          <el-select v-model="editForm.subjectId" placeholder="请选择学科" style="width: 100%">
            <el-option
              v-for="[id, name] of subjectMap"
              :key="id"
              :label="name"
              :value="Number(id)"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="教师">
          <el-select
            v-model="editForm.teacherId"
            :clearable="!isCreating"
            placeholder="请选择教师"
            style="width: 100%"
          >
            <el-option
              v-for="[id, name] of isCreating ? availableTeachers : teacherMap"
              :key="id"
              :label="name"
              :value="Number(id)"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showEditCourse = false">取消</el-button>
        <el-button
          :loading="saving"
          type="primary"
          @click="isCreating ? createCourse : updateCourse"
          >{{ isCreating ? '创建' : '保存' }}</el-button
        >
      </template>
    </el-dialog>

    <el-dialog v-model="showScheduleDialog" :title="scheduleDialogTitle" width="640px">
      <el-form v-if="scheduleForm" :model="scheduleForm" label-width="120px">
        <el-form-item label="周次" required>
          <el-input v-model="scheduleForm.weeksText" placeholder="例如: 1-16 或 1,3,5" />
          <div style="font-size: 12px; color: #999; margin-top: 4px">
            支持范围（如 1-16）或逗号分隔（如 1,3,5）
          </div>
        </el-form-item>
        <el-form-item label="星期" required>
          <el-checkbox-group v-model="scheduleForm.days">
            <el-checkbox
              v-for="(d, i) in ['周一', '周二', '周三', '周四', '周五', '周六', '周日']"
              :key="i"
              :label="i"
              >{{ d }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="节次" required>
          <div style="display: flex; align-items: center; gap: 8px">
            <el-input-number v-model="scheduleForm.sectionStart" :max="maxSection" :min="1" />
            <span>至</span>
            <el-input-number v-model="scheduleForm.sectionEnd" :max="maxSection" :min="1" />
          </div>
        </el-form-item>
        <el-form-item label="地点">
          <el-input v-model="scheduleForm.location" placeholder="教室或地点" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showScheduleDialog = false">取消</el-button>
        <el-button :loading="saving" type="primary" @click="saveSchedule">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { CourseDto, ScheduleDto } from '@edumgr/openapi';
import { coursesApi, schedulesApi, subjectsApi, teachersApi } from '@/clients/api';
import { fetchSubjectsMap, fetchTeachersMap } from '@/clients/range';
import { useUserProfileStore } from '@/stores/profile';
import { useConfigStore } from '@/stores/config';
import { ElMessage } from 'element-plus';

const route = useRoute();
const router = useRouter();
const profileStore = useUserProfileStore();
const cfgStore = useConfigStore();

const courseId = computed(() => Number(route.params.id));
const isCreating = computed(() => !courseId.value || route.query.create === '1');
const subjectIdFromQuery = computed(() =>
  route.query.subjectId ? Number(route.query.subjectId) : null,
);
const course = ref<CourseDto | null>(null);
const schedules = ref<ScheduleDto[]>([]);
const loading = ref(false);
const saving = ref(false);

const subjectMap = ref<Map<string, string>>(new Map());
const teacherMap = ref<Map<string, string>>(new Map());
const availableTeachers = ref<Map<string, string>>(new Map());

const canEdit = computed(() => {
  if (profileStore.isAdmin) return true;
  if (profileStore.isTeacher && course.value?.teacherId === profileStore.profile?.id) return true;
  return false;
});

const maxSection = computed(() => cfgStore.sections ?? 12);
async function loadCourse() {
  if (isCreating.value) {
    loading.value = true;
    try {
      course.value = null;
      schedules.value = [];
      await loadTeachersForCreation();
    } catch (err) {
      console.error(err);
      ElMessage.error('加载数据失败');
    } finally {
      loading.value = false;
    }
  } else if (courseId.value) {
    loading.value = true;
    try {
      course.value = await coursesApi.coursesDetail(courseId.value);
      await loadSchedules();
      await loadMaps();
    } catch (err) {
      console.error(err);
      ElMessage.error('加载课程信息失败');
    } finally {
      loading.value = false;
    }
  }
}
async function loadTeachersForCreation() {
  try {
    const subs = await subjectsApi.subjectsPage(1000, 0);
    const sm = new Map<string, string>();
    for (const s of subs || []) if (s && s.id != null) sm.set(String(s.id), s.name ?? String(s.id));
    subjectMap.value = sm;
    if (profileStore.isTeacher && profileStore.profile?.id != null) {
      const tId = profileStore.profile.id;
      const tm = new Map<string, string>();
      tm.set(String(tId), `教师 ${tId}`);
      availableTeachers.value = tm;
      return;
    }
  } catch (err) {
    console.error('loadTeachersForCreation error', err);
    availableTeachers.value = new Map();
  }
}

async function updateAvailableTeachersForSubject(subjectId: number) {
  try {
    if (!subjectId) {
      availableTeachers.value = new Map();
      return;
    }
    const arr = await subjectsApi.subjectsRange([subjectId]);
    const subj = (arr || [])[0];
    const deptId = subj?.departmentId ?? undefined;
    const tlist = await teachersApi.teachersPage(
      1000,
      0,
      undefined,
      undefined,
      deptId as number | undefined,
    );
    const tm = new Map<string, string>();
    for (const t of tlist || [])
      if (t && t.id != null) tm.set(String(t.id), t.name ?? String(t.id));
    availableTeachers.value = tm;
  } catch (e) {
    console.error('updateAvailableTeachersForSubject error', e);
    availableTeachers.value = new Map();
  }
}
async function loadSchedules() {
  if (!courseId.value) return;
  try {
    const result = await schedulesApi.schedulesPage(1000, 0, undefined, courseId.value);
    schedules.value = result || [];
  } catch (err) {
    console.error(err);
    schedules.value = [];
  }
}
async function loadMaps() {
  try {
    const subjectIds = course.value?.subjectId ? [course.value.subjectId] : [];
    const teacherIds = course.value?.teacherId ? [course.value.teacherId] : [];
    const allScheduleTeachers: number[] = [];

    const [sm, tm] = await Promise.all([
      fetchSubjectsMap(subjectIds),
      fetchTeachersMap([...teacherIds, ...allScheduleTeachers]),
    ]);
    subjectMap.value = sm;
    teacherMap.value = tm;
  } catch (err) {
    console.error(err);
  }
}
const showEditCourse = ref(false);
const editForm = ref<{ subjectId: number; teacherId: number | null }>({
  subjectId: 0,
  teacherId: null,
});

watch(showEditCourse, (show) => {
  if (show && course.value) {
    editForm.value = {
      subjectId: course.value.subjectId,
      teacherId: course.value.teacherId ?? null,
    };
  }
});
watch(
  () => editForm.value.subjectId,
  (nv) => {
    if (isCreating.value && profileStore.isAdmin) {
      void updateAvailableTeachersForSubject(nv || 0);
    }
  },
);

function goBack() {
  router.go(-1);
}

async function createCourse() {
  if (!editForm.value || !editForm.value.subjectId || !editForm.value.teacherId) {
    ElMessage.error('请选择学科和教师');
    return;
  }
  saving.value = true;
  try {
    await coursesApi.coursesCreate({
      subjectId: editForm.value.subjectId,
      teacherId: editForm.value.teacherId,
      locked: false,
    } as CourseDto);
    ElMessage.success('创建成功');
    showEditCourse.value = false;
    router.push(`/courses?subjectId=${editForm.value.subjectId}`);
  } catch (err) {
    console.error(err);
    ElMessage.error('创建失败');
  } finally {
    saving.value = false;
  }
}

async function updateCourse() {
  if (!course.value || !editForm.value) return;
  saving.value = true;
  try {
    await coursesApi.coursesUpdate(course.value.id, {
      ...course.value,
      subjectId: editForm.value.subjectId,
      teacherId: editForm.value.teacherId ?? undefined,
    });
    ElMessage.success('更新成功');
    showEditCourse.value = false;
    await loadCourse();
  } catch (err) {
    console.error(err);
    ElMessage.error('更新失败');
  } finally {
    saving.value = false;
  }
}

async function lockCourse() {
  if (!course.value || course.value.locked) return;
  saving.value = true;
  try {
    await coursesApi.coursesUpdate(course.value.id, {
      ...course.value,
      locked: true,
    });
    ElMessage.success('课程已锁定');
    await loadCourse();
  } catch (err) {
    console.error(err);
    ElMessage.error('锁定失败');
  } finally {
    saving.value = false;
  }
}
const showScheduleDialog = ref(false);
const scheduleDialogTitle = computed(() => (scheduleForm.value?.id ? '编辑排课' : '新建排课'));
const scheduleForm = ref<{
  id?: string | undefined;
  weeksText: string;
  days: number[];
  sectionStart: number;
  sectionEnd: number;
  location: string;
}>({
  weeksText: '1-16',
  days: [],
  sectionStart: 1,
  sectionEnd: 1,
  location: '',
});

function openNewSchedule() {
  scheduleForm.value = {
    weeksText: '1-16',
    days: [],
    sectionStart: 1,
    sectionEnd: 1,
    location: '',
  };
  showScheduleDialog.value = true;
}

function openEditSchedule(schedule: ScheduleDto) {
  scheduleForm.value = {
    id: schedule.id,
    weeksText: formatWeeks(schedule.weeks),
    days: parseDaysFromDto(schedule.days),
    sectionStart: parseSectionStart(schedule.sections),
    sectionEnd: parseSectionEnd(schedule.sections),
    location: schedule.location || '',
  };
  showScheduleDialog.value = true;
}

async function saveSchedule() {
  if (!scheduleForm.value) return;
  if (!scheduleForm.value.days.length) {
    ElMessage.error('请选择星期');
    return;
  }
  if (scheduleForm.value.sectionEnd < scheduleForm.value.sectionStart) {
    ElMessage.error('节次结束必须 >= 开始');
    return;
  }

  saving.value = true;
  try {
    const dto: ScheduleDto = {
      courseId: courseId.value,
      weeks: parseWeeks(scheduleForm.value.weeksText),
      days: scheduleForm.value.days.map((d) => [d, d + 1]),
      sections: [[scheduleForm.value.sectionStart - 1, scheduleForm.value.sectionEnd]],
      location: scheduleForm.value.location || undefined,
    } as ScheduleDto;

    if (scheduleForm.value.id) {
      dto.id = scheduleForm.value.id;
    }

    if (scheduleForm.value.id) {
      await schedulesApi.schedulesUpdate(scheduleForm.value.id, dto);
      ElMessage.success('更新成功');
    } else {
      await schedulesApi.schedulesCreate(dto);
      ElMessage.success('创建成功');
    }

    showScheduleDialog.value = false;
    await loadSchedules();
  } catch (err) {
    console.error(err);
    ElMessage.error('保存失败');
  } finally {
    saving.value = false;
  }
}

async function deleteSchedule(id?: string) {
  if (!id) return;
  try {
    await schedulesApi.schedulesDelete(id);
    ElMessage.success('删除成功');
    await loadSchedules();
  } catch (err) {
    console.error(err);
    ElMessage.error('删除失败');
  }
}
function parseWeeks(text: string): Array<Array<number>> {
  const parts = (text || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const out: Array<Array<number>> = [];
  for (const p of parts) {
    if (p.includes('-')) {
      const segs = p.split('-').map((x) => x.trim());
      const a = Number(segs[0] ?? NaN) - 1;
      const b = segs.length > 1 ? Number(segs[1] ?? NaN) : a + 1;
      if (!Number.isNaN(a) && !Number.isNaN(b)) out.push([a, b]);
    } else {
      const n = Number(p);
      if (!Number.isNaN(n)) out.push([n - 1, n]);
    }
  }
  return out.length ? out : [[0, 16]];
}

function formatWeeks(weeks: Array<Array<number>> | undefined | null): string {
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
      return `${Number(r[0]) + 1}`;
    })
    .join(',');
}

function formatDays(days: Array<Array<number>> | undefined | null): string {
  if (!days || !days.length) return '';
  const dayNames = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  const daySet = new Set<number>();
  for (const r of days) {
    if (!r || !r.length) continue;
    const start = Number(r[0]) || 0;
    const end = r.length > 1 ? Number(r[1]) : start + 1;
    for (let d = start; d < end; d++) {
      if (d >= 0 && d < 7) daySet.add(d);
    }
  }
  return Array.from(daySet)
    .sort()
    .map((d) => dayNames[d])
    .join(', ');
}

function formatSections(sections: Array<Array<number>> | undefined | null): string {
  if (!sections || !sections.length) return '';
  const ranges: string[] = [];
  for (const r of sections) {
    if (!r || !r.length) continue;
    const start = Number(r[0]) + 1;
    const end = r.length > 1 ? Number(r[1]) : start;
    if (end === start) ranges.push(`${start}`);
    else ranges.push(`${start}-${end}`);
  }
  return ranges.join(', ');
}

function parseDaysFromDto(days: Array<Array<number>> | undefined | null): number[] {
  if (!days || !days.length) return [];
  const daySet = new Set<number>();
  for (const r of days) {
    if (!r || !r.length) continue;
    const start = Number(r[0]) || 0;
    const end = r.length > 1 ? Number(r[1]) : start + 1;
    for (let d = start; d < end; d++) {
      if (d >= 0 && d < 7) daySet.add(d);
    }
  }
  return Array.from(daySet).sort();
}

function parseSectionStart(sections: Array<Array<number>> | undefined | null): number {
  if (!sections || !sections.length || !sections[0]) return 1;
  return Number(sections[0][0]) + 1;
}

function parseSectionEnd(sections: Array<Array<number>> | undefined | null): number {
  if (!sections || !sections.length || !sections[0]) return 1;
  return sections[0].length > 1 ? Number(sections[0][1]) : Number(sections[0][0]) + 1;
}

onMounted(async () => {
  await cfgStore.loadConfig();
  await loadCourse();
  if (isCreating.value && !editForm.value.subjectId) {
    editForm.value = {
      subjectId: subjectIdFromQuery.value ?? 0,
      teacherId: profileStore.isTeacher ? (profileStore.profile?.id ?? null) : null,
    };
  }
});
</script>

<style scoped>
.el-card {
  border-radius: 8px;
}
</style>
