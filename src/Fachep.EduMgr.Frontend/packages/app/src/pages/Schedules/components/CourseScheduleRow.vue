<template>
  <td>
    <div style="display: flex; justify-content: space-between; align-items: center">
      <div>
        <div style="font-weight: 700">{{ courseMap.get(String(course.id)) ?? course.id }}</div>
        <div style="font-size: 12px; color: #666; margin-top: 4px">
          <span v-if="course.subjectId">{{ subjectMap.get(String(course.subjectId)) ?? '' }}</span>
          <span v-if="course.teacherId">
            / {{ teacherMap.get(String(course.teacherId)) ?? '' }}</span
          >
        </div>
      </div>
      <div>
        <el-button size="small" type="text" @click.stop="$emit('view-course', course)"
          >查看详情</el-button
        >
      </div>
    </div>
  </td>
  <td v-for="(daySlotsForDay, di) in daySlots" :key="di">
    <div class="day-slots">
      <div v-for="(slotEntriesForSlot, si) in daySlotsForDay" :key="si" class="slot">
        <template v-if="slotEntriesForSlot.length">
          <div v-for="(entry, ei) in slotEntriesForSlot" :key="ei" class="slot-entry">
            <div class="timetable-entry__meta">
              {{ entry.location }}
              <br />
              {{ entry.weeks }}
            </div>
          </div>
        </template>
      </div>
    </div>
  </td>
</template>

<script lang="ts" setup>
import type { CourseDto, ScheduleDto } from '@edumgr/openapi';

type Entry = {
  schedule: ScheduleDto;
  courseName: string;
  teacherName?: string;
  subjectName?: string;
  weeks?: string;
  location?: string;
};

type Props = {
  course: CourseDto;
  daySlots: Entry[][][];
  courseMap: Map<string, string>;
  teacherMap: Map<string, string>;
  subjectMap: Map<string, string>;
};

const { course, daySlots, courseMap, teacherMap, subjectMap } = defineProps<Props>();
</script>

<style scoped>
.day-slots {
  display: flex;
  gap: 2px;
}
.slot {
  flex: 1;
  min-height: 36px;
  border-left: 1px solid #f0f0f0;
  padding: 2px;
  box-sizing: border-box;
}
.slot-entry {
  background: #fff6f0;
  border: 1px solid #ffe7d0;
  padding: 4px;
  margin-bottom: 4px;
  border-radius: 4px;
  font-size: 12px;
}
</style>
