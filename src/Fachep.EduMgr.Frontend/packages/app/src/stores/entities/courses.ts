import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '@/clients';
import type { CourseDto, OrderByColumn } from '@edumgr/openapi';

export const useCoursesStore = defineStore('courses', () => {
  const rangeCache = ref<Record<string, CourseDto[]>>({});
  const teacherPageCache = ref<Record<number, CourseDto[]>>({});

  async function coursesRange(ids: number[]) {
    if (!ids || !ids.length) return [] as CourseDto[];
    const key = ids.join(',');
    if (rangeCache.value[key]) return rangeCache.value[key];
    try {
      const resp = await api.coursesApi.coursesRange(ids as number[]);
      rangeCache.value[key] = resp || [];
      return rangeCache.value[key];
    } catch (e) {
      console.error('coursesRange error', e);
      return [] as CourseDto[];
    }
  }

  async function coursesPageForTeacher(teacherId: number) {
    if (!teacherId) return [] as CourseDto[];
    if (teacherPageCache.value[teacherId]) return teacherPageCache.value[teacherId];
    try {
      const resp = await api.coursesApi.coursesPage(1000, 0, undefined, teacherId);
      teacherPageCache.value[teacherId] = resp || [];
      return teacherPageCache.value[teacherId];
    } catch (e) {
      console.error('coursesPageForTeacher error', e);
      return [] as CourseDto[];
    }
  }

  async function coursesPage(
    limit = 1000,
    offset = 0,
    orderBy?: Array<OrderByColumn>,
    teacherId?: number,
    subjectId?: number,
    subjectName?: string,
    locked?: boolean,
  ) {
    const hasFilters = subjectId != null || subjectName != null || locked != null;
    if (teacherId != null && !hasFilters) return coursesPageForTeacher(teacherId);

    try {
      const resp = await api.coursesApi.coursesPage(
        limit,
        offset,
        orderBy,
        teacherId,
        subjectId,
        undefined,
        subjectName,
        locked,
      );
      return resp || [];
    } catch (e) {
      console.error('coursesPage error', e);
      return [] as CourseDto[];
    }
  }

  async function coursesCount(
    teacherId?: number,
    subjectId?: number,
    subjectName?: string,
    locked?: boolean,
  ) {
    try {
      return await api.coursesApi.coursesCount(
        teacherId,
        subjectId,
        undefined,
        subjectName,
        locked,
      );
    } catch (e) {
      console.error('coursesCount error', e);
      return 0;
    }
  }

  function clear(teacherId?: number) {
    if (teacherId) delete teacherPageCache.value[teacherId];
    else teacherPageCache.value = {};
  }

  function clearRangeCache() {
    rangeCache.value = {};
  }

  return { coursesRange, coursesPageForTeacher, coursesPage, coursesCount, clear, clearRangeCache };
});
