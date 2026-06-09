<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import type { CourseDto, ScheduleDto } from '@edumgr/openapi';
import { useConfigStore } from '@/stores/config';

interface Props {
  schedules: ScheduleDto[];
  courseMap: Map<string, string>;
  courseInfoMap: Map<string, CourseDto>;
  teacherMap: Map<string, string>;
  subjectMap: Map<string, string>;
  sections?: number;
  week?: number | null;
  sectionTimes?: Array<string | null> | null;
  sectionOrder?: number[] | null;
}

const props = defineProps<Props>();
const naturalSections = computed(() => props.sections ?? props.sectionTimes?.length ?? 12);
const order = computed(
  () =>
    props.sectionOrder ??
    (props.sectionTimes
      ? props.sectionTimes.map((_, i) => i + 1)
      : Array.from({ length: naturalSections.value }, (_, i) => i + 1)),
);
const displaySections = computed(() => order.value.length);
const showWeeks = computed(() => {
  return internalViewScope.value === 'term';
});
const cfgStore = useConfigStore();

const internalViewScope = ref<'week' | 'term'>(props.week === null ? 'term' : 'week');
function computeCurrentWeek(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const dayMs = 24 * 60 * 60 * 1000;
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / dayMs) + 1;
  return Math.max(1, Math.ceil(dayOfYear / 7));
}
const selectedWeekRef = ref<number | null>(
  props.week === undefined ? (cfgStore.currentWeek ?? computeCurrentWeek()) : props.week,
);

onMounted(() => {
  if (props.week === null) internalViewScope.value = 'term';
  else internalViewScope.value = 'week';
});
if (props.week === undefined) {
  watch(
    () => cfgStore.currentWeek,
    (nw) => {
      if (internalViewScope.value === 'week') selectedWeekRef.value = nw ?? computeCurrentWeek();
    },
    { immediate: true },
  );
}

type PartitionKey = 'morning' | 'noon' | 'afternoon' | 'night' | 'unknown';

const partitionLabels = computed(() => {
  return order.value.map((orig) => sectionPartitionKey(orig));
});

const partitionRuns = computed(() => {
  const labels = partitionLabels.value || [];
  const runs: Array<{ isStart: boolean; span: number; key: PartitionKey } | null> = labels.map(
    () => null,
  );
  let i = 0;
  while (i < labels.length) {
    const lbl = labels[i] ?? '';
    let j = i + 1;
    while (j < labels.length && labels[j] === lbl) j++;
    const span = j - i;
    runs[i] = { isStart: true, span, key: lbl as PartitionKey };
    i = j;
  }
  return runs;
});

type Entry = {
  schedule: ScheduleDto;
  courseName: string;
  teacherName?: string;
  subjectName?: string;
  weeks?: string;
  location?: string;
};
type Cell = { type: 'cell'; entries: Entry[]; rowspan?: number } | { type: 'skip' } | null;

function weeksLabel(weeks: Array<Array<number>> | undefined | null) {
  if (!weeks || !weeks.length) return '';
  return weeks
    .map((r) => {
      if (!r || !r.length) return '';
      if (r.length >= 2) {
        const start = Number(r[0]) || 0;
        const end = Number(r[1]) || start;
        if (end === start + 1) return `${start + 1}`;
        return `${start + 1}-${end}`;
      }
      const v = Number(r[0]) || 0;
      return `${v + 1}`;
    })
    .join(',');
}

function weekIncluded(weeks: Array<Array<number>> | undefined | null, w?: number | null) {
  if (w == null) return true;
  if (!weeks || !weeks.length) return false;
  const w0 = w - 1;
  for (const r of weeks) {
    if (!r || !r.length) continue;
    if (r.length === 1) {
      if (Number(r[0]) === w0) return true;
    } else if (r.length >= 2) {
      const start = Number(r[0]) || 0;
      const end = Number(r[1]) || start;
      if (w0 >= start && w0 < end) return true;
    }
  }
  return false;
}

function sectionTimeLabel(idx: number) {
  if (!props.sectionTimes) return '';
  return props.sectionTimes[idx] ?? '';
}

function sectionPartitionKey(origSection: number): PartitionKey {
  if (!props.sectionTimes) return 'unknown';
  const t = props.sectionTimes[origSection - 1];
  if (!t) return 'unknown';
  const m = String(t).match(/(\d{1,2}):(\d{2})/);
  if (!m) return 'unknown';
  const hh = Number(m[1]);
  if (isNaN(hh)) return 'unknown';
  if (hh < 12) return 'morning';
  if (hh >= 12 && hh < 14) return 'noon';
  if (hh >= 14 && hh < 18) return 'afternoon';
  return 'night';
}

const partitionLabelText: Record<PartitionKey, string> = {
  morning: '上午',
  noon: '中午',
  afternoon: '下午',
  night: '晚上',
  unknown: '',
};

const partitionClassMap: Record<PartitionKey, string> = {
  morning: 'partition-morning',
  noon: 'partition-noon',
  afternoon: 'partition-afternoon',
  night: 'partition-night',
  unknown: 'partition-unknown',
};

function partitionClass(label: PartitionKey | undefined) {
  return partitionClassMap[label ?? 'unknown'] ?? 'partition-unknown';
}
const grid = computed(() => {
  const ms = displaySections.value;
  const orderArr = order.value;
  const displayIndexMap = new Map<number, number>();
  for (let i = 0; i < orderArr.length; i++) {
    const v = orderArr[i];
    if (v != null) displayIndexMap.set(v, i);
  }
  const g: Array<Array<Cell>> = Array.from({ length: ms }, () => new Array<Cell>(7).fill(null));
  for (const s of props.schedules || []) {
    if (!s.days || !s.sections) continue;
    const cid = String(s.courseId);
    const cname = props.courseMap.get(cid) ?? `课程 ${s.courseId}`;
    const cinfo = props.courseInfoMap.get ? props.courseInfoMap.get(cid) : undefined;
    const teacherName = cinfo?.teacherId
      ? (props.teacherMap.get(String(cinfo.teacherId)) ?? '')
      : '';
    const subjectName = cinfo?.subjectId
      ? (props.subjectMap.get(String(cinfo.subjectId)) ?? '')
      : '';
    const wlbl = weeksLabel(s.weeks);
    const loc = s.location ?? '';

    const daysArr: Array<number | number[]> = (s.days as Array<number | number[]>) || [];
    const sectionsArr: Array<number | number[]> = (s.sections as Array<number | number[]>) || [];
    for (const dr of daysArr) {
      let dstart = 0;
      let dend = 0;
      if (typeof dr === 'number') {
        dstart = dr;
        dend = dr + 1;
      } else if (Array.isArray(dr) && dr.length > 0) {
        dstart = Number(dr[0]) || 0;
        dend = dr.length > 1 ? Number(dr[1]) || dstart : dstart + 1;
      }
      for (let d = dstart; d < dend; d++) {
        const dayIndex = Math.max(0, Math.min(6, d));
        for (const sr of sectionsArr) {
          let sstart = 0;
          let send = 0;
          if (typeof sr === 'number') {
            sstart = sr;
            send = sr + 1;
          } else if (Array.isArray(sr) && sr.length > 0) {
            sstart = Number(sr[0]) || 0;
            send = sr.length > 1 ? Number(sr[1]) || sstart : sstart + 1;
          }
          const mapped: number[] = [];
          for (let orig = sstart; orig < send; orig++) {
            let di = displayIndexMap.get(orig);
            if (di == null) di = displayIndexMap.get(orig + 1);
            if (di != null && di >= 0 && di < ms) mapped.push(di);
          }
          if (!mapped.length) continue;
          mapped.sort((a, b) => a - b);
          let runStart: number = mapped[0] as number;
          let runLen = 1;
          for (let i = 1; i <= mapped.length; i++) {
            const cur = mapped[i] as number | undefined;
            if (cur !== undefined && cur === runStart + runLen) {
              runLen++;
              continue;
            }
            const startIdx = runStart as number;
            const span = runLen;
            if (startIdx < 0 || startIdx >= ms) {
              if (cur == null) break;
              runStart = cur as number;
              runLen = 1;
              continue;
            }
            const row = g[startIdx] as Array<Cell>;
            const cell = row ? row[dayIndex] : undefined;
            if (cell == null) {
              row[dayIndex] = {
                type: 'cell',
                entries: [
                  {
                    schedule: s,
                    courseName: cname,
                    teacherName,
                    subjectName,
                    weeks: wlbl,
                    location: loc,
                  },
                ],
                rowspan: span,
              };
              for (let k = startIdx + 1; k < startIdx + span && k < ms; k++) {
                if (!g[k]) g[k] = new Array<Cell>(7).fill(null);
                g[k]![dayIndex] = { type: 'skip' };
              }
            } else if (cell && (cell as { type?: string }).type === 'cell') {
              (cell as { type: 'cell'; entries: Entry[] }).entries.push({
                schedule: s,
                courseName: cname,
                teacherName,
                subjectName,
                weeks: wlbl,
                location: loc,
              });
            }
            if (cur == null) break;
            runStart = cur;
            runLen = 1;
          }
        }
      }
    }
  }
  return g;
});

function getEntries(secIndex: number, dayIndex: number) {
  const cell = grid.value?.[secIndex]?.[dayIndex] as Cell | undefined | null;
  const raw: Entry[] =
    cell && (cell as { type?: string }).type === 'cell'
      ? (cell as { type: 'cell'; entries: Entry[] }).entries
      : [];
  const wk = internalViewScope.value === 'week' ? selectedWeekRef.value : null;
  return raw.filter((e) =>
    weekIncluded(e.schedule.weeks as unknown as Array<Array<number>> | undefined | null, wk),
  );
}
</script>

<template>
  <div
    class="timetable-controls"
    style="margin-bottom: 8px; display: flex; align-items: center; gap: 12px"
  >
    <div>显示范围：</div>
    <el-select v-model="internalViewScope" style="width: 140px">
      <el-option label="特定周" value="week" />
      <el-option label="整个学期" value="term" />
    </el-select>
    <div v-if="internalViewScope === 'week'" style="display: flex; align-items: center; gap: 8px">
      <div>周次：</div>
      <el-select v-model="selectedWeekRef" placeholder="选择周" style="width: 120px">
        <el-option v-for="w in 20" :key="w" :label="`第 ${w} 周`" :value="w" />
      </el-select>
    </div>
  </div>
  <div class="timetable-wrap">
    <table class="timetable-table">
      <colgroup>
        <col style="width: 64px" />
        <col style="width: 80px" />
        <col v-for="i in 7" :key="i" />
      </colgroup>
      <thead>
        <tr>
          <th class="section-partition-header">时间</th>
          <th class="section-header">节次</th>
          <th
            v-for="(d, idx) in ['周一', '周二', '周三', '周四', '周五', '周六', '周日']"
            :key="idx"
          >
            {{ d }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(origSection, displayIdx) in order"
          :key="origSection"
          :class="partitionClass(partitionLabels ? partitionLabels[displayIdx] : 'unknown')"
        >
          <template
            v-if="partitionRuns && partitionRuns[displayIdx] && partitionRuns[displayIdx].isStart"
          >
            <td :rowspan="partitionRuns[displayIdx].span" class="section-partition">
              {{ partitionLabelText[partitionRuns[displayIdx].key] }}
            </td>
          </template>
          <td class="section-cell">
            <div class="section-index">{{ displayIdx + 1 }}</div>
            <div v-if="origSection" class="section-sub">原序: {{ origSection }}</div>
            <div v-if="sectionTimeLabel(origSection - 1)" class="section-time">
              {{ sectionTimeLabel(origSection - 1) }}
            </div>
          </td>
          <td v-for="dayIndex in 7" :key="dayIndex">
            <div v-if="getEntries(displayIdx, dayIndex - 1).length">
              <div
                v-for="(entry, ei) in getEntries(displayIdx, dayIndex - 1)"
                :key="ei"
                class="timetable-entry"
              >
                <div class="timetable-entry__title">
                  {{ entry.subjectName || entry.courseName }}
                </div>
                <div class="timetable-entry__meta">{{ entry.location }}</div>
                <div v-if="entry.teacherName" class="timetable-entry__meta">
                  {{ entry.teacherName }}
                </div>
                <div v-if="showWeeks" class="timetable-entry__meta">{{ entry.weeks }}</div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.timetable-wrap {
  width: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.timetable-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  min-width: 880px;
  table-layout: fixed;
}
.timetable-table th,
.timetable-table td {
  overflow: hidden;
  word-break: break-word;
}
.timetable-table thead th {
  background: #fafafa;
  border-bottom: 1px solid #eaeaea;
  padding: 8px;
  font-weight: 600;
  text-align: center;
}
.timetable-table tbody td {
  border-bottom: 1px solid #f3f4f6;
  border-right: 1px solid #f3f4f6;
  padding: 6px;
  vertical-align: top;
  min-height: 48px;
}
.section-header {
  width: 80px;
}
.section-cell {
  width: 80px;
  text-align: center;
  font-weight: 600;
}
.timetable-entry {
  background: #f0f9ff;
  border: 1px solid #e6f7ff;
  padding: 6px;
  margin-bottom: 6px;
  border-radius: 4px;
  white-space: normal;
}
.timetable-entry__title {
  font-weight: 700;
}
.timetable-entry__meta {
  font-size: 12px;
  color: #666;
}
.section-index {
  font-weight: 700;
}
.section-time {
  font-size: 12px;
  color: #666;
  margin-top: 2px;
}
.section-sub {
  font-size: 11px;
  color: #999;
  margin-top: 2px;
}
.section-partition {
  width: 64px;
  text-align: center;
  font-size: 13px;
  color: #333;
  font-weight: 600;
}
.section-partition-header {
  width: 64px;
  text-align: center;
}
.partition-morning {
  background: #fffaf0;
}
.partition-noon {
  background: #f7f7f9;
}
.partition-afternoon {
  background: #f4fffb;
}
.partition-night {
  background: #fbf0ff;
}
.partition-unknown {
  background: transparent;
}

.timetable-controls {
  flex-wrap: wrap;
}
.timetable-controls > * {
  flex: 0 0 auto;
}

@media (max-width: 900px) {
  .timetable-table {
    min-width: 720px;
  }
  .timetable-entry {
    padding: 4px;
    font-size: 13px;
  }
  .timetable-entry__meta {
    font-size: 11px;
  }
  .timetable-controls {
    gap: 8px;
  }
}

@media (max-width: 520px) {
  .timetable-controls {
    flex-direction: column;
    align-items: flex-start;
  }
  .timetable-table {
    min-width: 520px;
  }
  .section-header,
  .section-cell {
    width: 64px;
  }
  .section-partition {
    width: 48px;
  }
  .timetable-entry {
    padding: 6px;
  }
}
</style>
