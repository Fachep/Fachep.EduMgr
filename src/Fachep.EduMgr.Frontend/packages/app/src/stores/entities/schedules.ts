import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '@/clients';
import type { ScheduleDto } from '@edumgr/openapi';

export const useSchedulesStore = defineStore('schedules', () => {
  const courseCache = ref<Record<number, ScheduleDto[]>>({});

  async function schedulesForCourse(courseId: number) {
    if (!courseId) return [] as ScheduleDto[];
    if (courseCache.value[courseId]) return courseCache.value[courseId];
    try {
      const resp = await api.schedulesApi.schedulesPage(1000, 0, undefined, courseId);
      courseCache.value[courseId] = resp || [];
      return courseCache.value[courseId];
    } catch (e) {
      console.error('schedulesForCourse error', e);
      return [] as ScheduleDto[];
    }
  }

  async function schedulesForCourseIds(courseIds: number[]) {
    const all: ScheduleDto[] = [];
    if (!courseIds || !courseIds.length) return all;
    try {
      const promises = courseIds.map((id) => schedulesForCourse(id));
      const results = await Promise.all(promises);
      for (const r of results || []) if (r && r.length) all.push(...r);
    } catch (e) {
      console.error('schedulesForCourseIds error', e);
    }
    return all;
  }

  function clear(courseId?: number) {
    if (courseId) delete courseCache.value[courseId];
    else courseCache.value = {};
  }

  return { schedulesForCourse, schedulesForCourseIds, clear };
});
