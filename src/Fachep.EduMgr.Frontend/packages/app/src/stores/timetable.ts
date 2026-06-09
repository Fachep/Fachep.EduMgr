import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ClassDto, CourseDto, ScheduleDto, StudentDto, TeacherDto } from '@edumgr/openapi';
import {
  useClassesStore,
  useCoursesStore,
  useEnrollmentsStore,
  useSchedulesStore,
  useStudentsStore,
  useTeachersStore,
} from './index';

export const useTimetableStore = defineStore('timetable', () => {
  const studentEnrollments = ref<Record<number, number[]>>({});
  const teacherCourses = ref<Record<number, CourseDto[]>>({});
  const studentSchedules = ref<Record<number, ScheduleDto[]>>({});
  const studentClass = ref<Record<number, ClassDto | null>>({});
  const teacherClasses = ref<Record<number, ClassDto[]>>({});
  const teacherSchedules = ref<Record<number, ScheduleDto[]>>({});

  async function loadStudentEnrollments(studentId: number) {
    if (!studentId) return [] as number[];
    if (studentEnrollments.value[studentId]) return studentEnrollments.value[studentId];
    try {
      const es = useEnrollmentsStore();
      const courseIds = await es.enrollmentsForStudent(studentId);
      studentEnrollments.value[studentId] = courseIds;
      return courseIds;
    } catch (e) {
      console.error('loadStudentEnrollments error', e);
      return [] as number[];
    }
  }

  async function loadTeacherCourses(teacherId: number) {
    if (!teacherId) return [] as CourseDto[];
    if (teacherCourses.value[teacherId]) return teacherCourses.value[teacherId];
    try {
      const cs = useCoursesStore();
      const courses = await cs.coursesPageForTeacher(teacherId);
      teacherCourses.value[teacherId] = courses || [];
      return teacherCourses.value[teacherId];
    } catch (e) {
      console.error('loadTeacherCourses error', e);
      return [] as CourseDto[];
    }
  }

  async function loadSchedulesForCourseIds(courseIds: number[]) {
    const all: ScheduleDto[] = [];
    if (!courseIds || !courseIds.length) return all;
    try {
      const ss = useSchedulesStore();
      const results = await ss.schedulesForCourseIds(courseIds);
      if (results && results.length) all.push(...results);
    } catch (e) {
      console.error('loadSchedulesForCourseIds error', e);
    }
    return all;
  }

  async function loadCoursesRange(ids: number[]) {
    if (!ids || !ids.length) return [] as CourseDto[];
    try {
      const cs = useCoursesStore();
      const resp = await cs.coursesRange(ids);
      return resp || [];
    } catch (e) {
      console.error('loadCoursesRange error', e);
      return [] as CourseDto[];
    }
  }

  async function loadStudentSchedules(studentId: number) {
    if (!studentId) return [] as ScheduleDto[];
    if (studentSchedules.value[studentId]) return studentSchedules.value[studentId];
    try {
      const courseIds = await loadStudentEnrollments(studentId);
      if (!courseIds || !courseIds.length) {
        studentSchedules.value[studentId] = [];
        return [];
      }
      const scheds = await loadSchedulesForCourseIds(courseIds);
      studentSchedules.value[studentId] = scheds || [];
      return studentSchedules.value[studentId];
    } catch (e) {
      console.error('loadStudentSchedules error', e);
      studentSchedules.value[studentId] = [];
      return [] as ScheduleDto[];
    }
  }

  async function loadStudentClass(studentId: number) {
    if (!studentId) return null as ClassDto | null;
    if (studentClass.value[studentId] !== undefined) return studentClass.value[studentId];
    try {
      const ss = useStudentsStore();
      const sarr = await ss.studentsRange([studentId]);
      const srec: StudentDto | undefined = sarr && sarr.length ? sarr[0] : undefined;
      const cid = srec?.classId;
      if (cid == null) {
        studentClass.value[studentId] = null;
        return null;
      }
      const cs = useClassesStore();
      const carr = await cs.classesRange([cid]);
      const crec: ClassDto | undefined = carr && carr.length ? carr[0] : undefined;
      studentClass.value[studentId] = crec ?? null;
      return studentClass.value[studentId];
    } catch (e) {
      console.error('loadStudentClass error', e);
      studentClass.value[studentId] = null;
      return null;
    }
  }

  async function loadTeacherClasses(teacherId: number) {
    if (!teacherId) return [] as ClassDto[];
    if (teacherClasses.value[teacherId]) return teacherClasses.value[teacherId];
    try {
      const cs = useClassesStore();
      const classes = await cs.classesPage(1000, 0, undefined, undefined, teacherId);
      teacherClasses.value[teacherId] = classes || [];
      return teacherClasses.value[teacherId];
    } catch (e) {
      console.error('loadTeacherClasses error', e);
      return [] as ClassDto[];
    }
  }

  async function loadStudentsForTeacher(teacherId: number) {
    if (!teacherId) return [] as StudentDto[];
    try {
      const classes = await loadTeacherClasses(teacherId);
      const classIds = Array.from(
        new Set(classes.map((c) => c && c.id).filter((x): x is number => x != null)),
      );
      const agg: StudentDto[] = [];
      const ss = useStudentsStore();
      for (const cid of classIds) {
        try {
          const chunk = await ss.studentsPage(1000, 0, undefined, cid);
          if (chunk && chunk.length) agg.push(...(chunk as StudentDto[]));
        } catch (e) {
          console.error('loadStudentsForTeacher - studentsPage error for class', cid, e);
        }
      }
      const byId = new Map<number, StudentDto>();
      for (const s of agg) if (s && s.id != null) byId.set(s.id, s);
      return Array.from(byId.values());
    } catch (e) {
      console.error('loadStudentsForTeacher error', e);
      return [] as StudentDto[];
    }
  }

  async function loadTeacherRecord(teacherId: number) {
    if (!teacherId) return null as TeacherDto | null;
    try {
      const ts = useTeachersStore();
      const tarr = await ts.teachersRange([teacherId]);
      const trec: TeacherDto | undefined = tarr && tarr.length ? tarr[0] : undefined;
      return trec ?? null;
    } catch (e) {
      console.error('loadTeacherRecord error', e);
      return null;
    }
  }

  async function loadTeacherSchedules(teacherId: number) {
    if (!teacherId) return [] as ScheduleDto[];
    if (teacherSchedules.value[teacherId]) return teacherSchedules.value[teacherId];
    try {
      const courses = await loadTeacherCourses(teacherId);
      const courseIds = Array.from(
        new Set((courses || []).map((c) => c.id).filter((x): x is number => x != null)),
      );
      if (!courseIds.length) {
        teacherSchedules.value[teacherId] = [];
        return [];
      }
      const scheds = await loadSchedulesForCourseIds(courseIds);
      teacherSchedules.value[teacherId] = scheds || [];
      return teacherSchedules.value[teacherId];
    } catch (e) {
      console.error('loadTeacherSchedules error', e);
      teacherSchedules.value[teacherId] = [];
      return [] as ScheduleDto[];
    }
  }
  function preloadStudentCaches(studentId: number) {
    if (!studentId) return;
    void (async () => {
      try {
        await loadStudentEnrollments(studentId);
        await loadStudentSchedules(studentId);
        await loadStudentClass(studentId);
      } catch (e) {
        console.error('preloadStudentCaches error', e);
      }
    })();
  }

  function preloadTeacherCaches(teacherId: number) {
    if (!teacherId) return;
    void (async () => {
      try {
        await loadTeacherClasses(teacherId);
        await loadTeacherCourses(teacherId);
        await loadTeacherSchedules(teacherId);
      } catch (e) {
        console.error('preloadTeacherCaches error', e);
      }
    })();
  }

  function clearStudentCache(studentId?: number) {
    const es = useEnrollmentsStore();
    es.clear(studentId);
    if (studentId) delete studentEnrollments.value[studentId];
    else studentEnrollments.value = {};
  }

  function clearTeacherCache(teacherId?: number) {
    const cs = useCoursesStore();
    cs.clear(teacherId);
    if (teacherId) delete teacherCourses.value[teacherId];
    else teacherCourses.value = {};
  }

  function clearAllStudentCaches(studentId?: number) {
    const es = useEnrollmentsStore();
    const ss = useSchedulesStore();
    const studs = useStudentsStore();
    if (studentId) {
      es.clear(studentId);
      ss.clear();
      delete studentEnrollments.value[studentId];
      delete studentSchedules.value[studentId];
      delete studentClass.value[studentId];
    } else {
      es.clear();
      ss.clear();
      studentEnrollments.value = {};
      studentSchedules.value = {};
      studentClass.value = {};
      studs.clear();
    }
  }

  function clearAllTeacherCaches(teacherId?: number) {
    const cs = useCoursesStore();
    const cls = useClassesStore();
    const ss = useSchedulesStore();
    if (teacherId) {
      cs.clear(teacherId);
      cls.clear();
      ss.clear();
      delete teacherCourses.value[teacherId];
      delete teacherClasses.value[teacherId];
      delete teacherSchedules.value[teacherId];
    } else {
      cs.clear();
      cls.clear();
      ss.clear();
      teacherCourses.value = {};
      teacherClasses.value = {};
      teacherSchedules.value = {};
    }
  }

  return {
    studentEnrollments,
    teacherCourses,
    studentSchedules,
    studentClass,
    teacherClasses,
    teacherSchedules,
    loadStudentEnrollments,
    loadTeacherCourses,
    loadStudentSchedules,
    loadStudentClass,
    loadTeacherClasses,
    loadTeacherSchedules,
    loadStudentsForTeacher,
    loadTeacherRecord,
    loadCoursesRange,
    loadSchedulesForCourseIds,
    preloadStudentCaches,
    preloadTeacherCaches,
    clearStudentCache,
    clearTeacherCache,
    clearAllStudentCaches,
    clearAllTeacherCaches,
  };
});
