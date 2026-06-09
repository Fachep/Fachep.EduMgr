import * as api from './api';

function toMap<T extends { id?: number | string; name?: string | null }>(items: T[] | undefined) {
  const m = new Map<string, string>();
  if (!items) return m;
  for (const it of items) {
    if (it && it.id != null) {
      const name = (it as { name?: string | null }).name ?? String(it.id);
      m.set(String(it.id), name);
    }
  }
  return m;
}

export async function fetchCoursesMap(ids: number[]) {
  if (!ids || !ids.length) return new Map<string, string>();
  const resp = await api.coursesApi.coursesRange(ids);
  return toMap(resp) as Map<string, string>;
}

export async function fetchStudentsMap(ids: number[]) {
  if (!ids || !ids.length) return new Map<string, string>();
  const resp = await api.studentsApi.studentsRange(ids);
  return toMap(resp) as Map<string, string>;
}

export async function fetchTeachersMap(ids: number[]) {
  if (!ids || !ids.length) return new Map<string, string>();
  const resp = await api.teachersApi.teachersRange(ids);
  return toMap(resp) as Map<string, string>;
}

export async function fetchClassesMap(ids: number[]) {
  if (!ids || !ids.length) return new Map<string, string>();
  const resp = await api.classesApi.classesRange(ids);
  return toMap(resp) as Map<string, string>;
}

export async function fetchDepartmentsMap(ids: number[]) {
  if (!ids || !ids.length) return new Map<string, string>();
  const resp = await api.departmentsApi.departmentsRange(ids);
  return toMap(resp) as Map<string, string>;
}

export async function fetchSubjectsMap(ids: number[]) {
  if (!ids || !ids.length) return new Map<string, string>();
  const resp = await api.subjectsApi.subjectsRange(ids);
  return toMap(resp) as Map<string, string>;
}

export async function fetchMajorsMap(ids: number[]) {
  if (!ids || !ids.length) return new Map<string, string>();
  const resp = await api.majorsApi.majorsRange(ids);
  return toMap(resp) as Map<string, string>;
}

export async function fetchUsersMap(ids: number[]) {
  if (!ids || !ids.length) return new Map<string, string>();
  const resp = await api.usersApi.usersRange(ids);
  return toMap(resp) as Map<string, string>;
}

export async function fetchCoursesMapSafe(ids: number[]) {
  try {
    return await fetchCoursesMap(ids);
  } catch {
    return new Map<string, string>();
  }
}

export default {
  fetchCoursesMap,
  fetchStudentsMap,
  fetchTeachersMap,
  fetchClassesMap,
  fetchDepartmentsMap,
  fetchSubjectsMap,
  fetchMajorsMap,
  fetchUsersMap,
};
