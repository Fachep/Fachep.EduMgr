import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { useUserProfileStore } from '@/stores';

import {
  ChangePasswordPage,
  ClassesPage,
  ClassManagePage,
  ConfigPage,
  CourseManagePage,
  CoursesPage,
  DepartmentManagePage,
  DepartmentsPage,
  EnrollmentsPage,
  HomePage,
  LoginPage,
  MajorManagePage,
  MajorsPage,
  ProfilePage,
  SchedulesPage,
  StudentManagePage,
  StudentsPage,
  SubjectsPage,
  TeacherManagePage,
  TeachersPage,
  TimetablePage,
  UsersPage,
} from '@/pages';

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/home' },
  { path: '/login', component: LoginPage, meta: { bareLayout: true } },
  { path: '/profile', component: ProfilePage, meta: { requiresAuth: true } },
  { path: '/change-password', component: ChangePasswordPage, meta: { requiresAuth: true } },
  { path: '/classes', component: ClassesPage, meta: { requiresAuth: true } },
  {
    path: '/classes/create',
    component: ClassManagePage,
    meta: { requiresAuth: true, allowedRoles: ['admin', 'teacher'] },
  },
  {
    path: '/classes/:id/manage',
    component: ClassManagePage,
    meta: { requiresAuth: true, allowedRoles: ['admin', 'teacher'] },
  },
  {
    path: '/students',
    component: StudentsPage,
    meta: { requiresAuth: true, allowedRoles: ['admin', 'teacher'] },
  },
  {
    path: '/students/:id/manage',
    component: StudentManagePage,
    meta: { requiresAuth: true, allowedRoles: ['admin'] },
  },
  {
    path: '/teachers',
    component: TeachersPage,
    meta: { requiresAuth: true, allowedRoles: ['admin'] },
  },
  {
    path: '/teachers/:id/manage',
    component: TeacherManagePage,
    meta: { requiresAuth: true, allowedRoles: ['admin'] },
  },
  {
    path: '/subjects',
    component: SubjectsPage,
    meta: { requiresAuth: true, allowedRoles: ['admin', 'teacher'] },
  },
  { path: '/courses', component: CoursesPage, meta: { requiresAuth: true } },
  {
    path: '/courses/create',
    component: CourseManagePage,
    meta: { requiresAuth: true, allowedRoles: ['admin', 'teacher'] },
  },
  {
    path: '/courses/:id/manage',
    component: CourseManagePage,
    meta: { requiresAuth: true, allowedRoles: ['admin', 'teacher'] },
  },
  {
    path: '/enrollments',
    component: EnrollmentsPage,
    meta: { requiresAuth: true, allowedRoles: ['admin', 'student'] },
  },
  { path: '/schedules', component: SchedulesPage, meta: { requiresAuth: true } },
  { path: '/timetable', component: TimetablePage, meta: { requiresAuth: true } },
  { path: '/home', component: HomePage, meta: { requiresAuth: true } },
  {
    path: '/departments',
    component: DepartmentsPage,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: '/departments/create',
    component: DepartmentManagePage,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: '/departments/:id/manage',
    component: DepartmentManagePage,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  { path: '/majors', component: MajorsPage, meta: { requiresAuth: true, requiresAdmin: true } },
  {
    path: '/majors/create',
    component: MajorManagePage,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: '/majors/:id/manage',
    component: MajorManagePage,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  { path: '/users', component: UsersPage, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/config', component: ConfigPage, meta: { requiresAuth: true, requiresAdmin: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const profileStore = useUserProfileStore();
  if (!profileStore.profile) {
    try {
      await profileStore.fetchProfile();
    } catch {}
  }

  const requiresAuth = to.meta?.requiresAuth;
  if (requiresAuth && !profileStore.profile) {
    return { path: '/login' };
  }

  const requiresAdmin = to.meta?.requiresAdmin;
  if (requiresAdmin && !profileStore.isAdmin) {
    return { path: '/' };
  }

  const allowedRoles = (to.meta as unknown as { allowedRoles?: string[] })?.allowedRoles;
  if (allowedRoles && profileStore.profile) {
    const okAdmin = allowedRoles.includes('admin') && profileStore.isAdmin;
    const okTeacher = allowedRoles.includes('teacher') && profileStore.isTeacher;
    const okStudent = allowedRoles.includes('student') && profileStore.isStudent;
    if (!okAdmin && !okTeacher && !okStudent) {
      return { path: '/' };
    }
  }

  if (to.path === '/login' && profileStore.profile) {
    return { path: '/' };
  }
});

export default router;
