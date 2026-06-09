import { useCoursesStore } from './entities/courses';
import { useStudentsStore } from './entities/students';
import { useClassesStore } from './entities/classes';
import { useEnrollmentsStore } from './entities/enrollments';
import { useSubjectsStore } from './entities/subjects';
import { useTeachersStore } from './entities/teachers';
import { useSchedulesStore } from './entities/schedules';

export function clearAllStores() {
  try {
    useCoursesStore().clear();
  } catch {}
  try {
    useCoursesStore().clearRangeCache();
  } catch {}
  try {
    useStudentsStore().clear();
  } catch {}
  try {
    useClassesStore().clear();
  } catch {}
  try {
    useEnrollmentsStore().clear();
  } catch {}
  try {
    useSubjectsStore().clear();
  } catch {}
  try {
    useTeachersStore().clear();
  } catch {}
  try {
    useSchedulesStore().clear();
  } catch {}
}

export {
  useCoursesStore,
  useStudentsStore,
  useClassesStore,
  useEnrollmentsStore,
  useSubjectsStore,
  useTeachersStore,
  useSchedulesStore,
};
export * from './profile';
