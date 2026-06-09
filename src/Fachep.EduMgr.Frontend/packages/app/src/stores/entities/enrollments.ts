import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '@/clients';
import type { EnrollmentDto, OrderByColumn } from '@edumgr/openapi';

export const useEnrollmentsStore = defineStore('enrollments', () => {
  const studentEnrollCache = ref<Record<number, number[]>>({});

  async function enrollmentsForStudent(studentId: number) {
    if (!studentId) return [] as number[];
    if (studentEnrollCache.value[studentId]) return studentEnrollCache.value[studentId];
    try {
      const enrolls: EnrollmentDto[] = await api.enrollmentsApi.enrollmentsPage(
        1000,
        0,
        undefined,
        studentId,
      );
      const courseIds = Array.from(
        new Set((enrolls || []).map((e) => e.courseId).filter((x): x is number => x != null)),
      );
      studentEnrollCache.value[studentId] = courseIds;
      return courseIds;
    } catch (e) {
      console.error('enrollmentsForStudent error', e);
      return [] as number[];
    }
  }

  async function enrollmentsPage(
    limit = 1000,
    offset = 0,
    orderBy?: OrderByColumn[] | undefined,
    studentId?: number,
  ) {
    const key = `p:${limit}:${offset}:${orderBy ?? ''}:${studentId ?? ''}`;
    try {
      const resp = await api.enrollmentsApi.enrollmentsPage(limit, offset, orderBy, studentId);
      return resp || ([] as number[]);
    } catch (e) {
      console.error('enrollmentsPage error', e);
      return [] as number[];
    }
  }

  async function enrollmentsCount(studentId?: number) {
    try {
      const cnt = await api.enrollmentsApi.enrollmentsCount(studentId);
      return cnt ?? 0;
    } catch (e) {
      console.error('enrollmentsCount error', e);
      return 0;
    }
  }

  function clear(studentId?: number) {
    if (studentId) delete studentEnrollCache.value[studentId];
    else studentEnrollCache.value = {};
  }

  return { enrollmentsForStudent, enrollmentsCount, enrollmentsPage, clear };
});
