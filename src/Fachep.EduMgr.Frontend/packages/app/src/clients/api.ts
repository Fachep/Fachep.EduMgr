import {
  AuthApi,
  ClassesApi,
  ConfigApi,
  CoursesApi,
  DepartmentsApi,
  EnrollmentsApi,
  MajorsApi,
  ProfileApi,
  SchedulesApi,
  StudentsApi,
  SubjectsApi,
  TeachersApi,
  UsersApi,
} from '@edumgr/openapi';
import config from './config';

export const authApi = new AuthApi(config);
export const usersApi = new UsersApi(config);
export const profileApi = new ProfileApi(config);
export const studentsApi = new StudentsApi(config);
export const teachersApi = new TeachersApi(config);
export const coursesApi = new CoursesApi(config);
export const enrollmentsApi = new EnrollmentsApi(config);
export const classesApi = new ClassesApi(config);
export const majorsApi = new MajorsApi(config);
export const subjectsApi = new SubjectsApi(config);
export const schedulesApi = new SchedulesApi(config);
export const departmentsApi = new DepartmentsApi(config);
export const configApi = new ConfigApi(config);
