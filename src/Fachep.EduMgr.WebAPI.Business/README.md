后端 WebAPI 业务实现
===
业务模型定义和服务、控制器实现

Account 模块
---
用户账户和认证相关业务逻辑实现。

服务：

- [AuthService](./Account/Services/AuthService.cs) 认证服务，集成 Microsoft.AspNetCore.Identity。
- [UserService](./Account/Services/UserService.cs) 用户服务，提供用户信息查询、修改等功能。

控制器：

- [/Account/Auth/](./Account/Controllers/AuthController.cs) 认证和登录相关 API。
- [/Account/Users/](./Account/Controllers/UsersController.cs) 用户信息相关 API。
- [/Account/Profile/](./Account/Controllers/ProfileController.cs) 用户个人信息相关 API。

People 模块
---
人事和行政相关业务逻辑实现。

服务：

- [ClassService](./People/Services/ClassService.cs) 班级管理。
- [DepartmentService](./People/Services/DepartmentService.cs) 部门和学院管理。
- [MajorService](./People/Services/MajorService.cs) 专业管理。
- [StudentService](./People/Services/StudentService.cs) 学生管理。
- [TeacherService](./People/Services/TeacherService.cs) 教师管理。

控制器：

- [/People/Classes/](./People/Controllers/ClassesController.cs) 班级相关 API。
- [/People/Departments/](./People/Controllers/DepartmentsController.cs) 部门和学院相关 API。
- [/People/Majors/](./People/Controllers/MajorsController.cs) 专业相关 API。
- [/People/Students/](./People/Controllers/StudentsController.cs) 学生相关 API。
- [/People/Teachers/](./People/Controllers/TeachersController.cs) 教师相关 API。

Education 模块
---
教学相关业务逻辑实现。

服务：

- [CourseService](./Education/Services/CourseService.cs) 课程管理。
- [EnrollmentService](./Education/Services/EnrollmentService.cs) 选课管理。
- [ScheduleService](./Education/Services/ScheduleService.cs) 排课管理。
- [SubjectService](./Education/Services/SubjectService.cs) 学科管理。

控制器：

- [/Education/Courses/](./Education/Controllers/CoursesController.cs) 课程相关 API。
- [/Education/Enrollments/](./Education/Controllers/EnrollmentsController.cs) 选课相关 API。
- [/Education/Schedules/](./Education/Controllers/SchedulesController.cs) 排课相关 API。
- [/Education/Subjects/](./Education/Controllers/SubjectsController.cs) 学科相关 API。

Common 模块
---
系统公共业务逻辑实现。

服务：

- [ConfigService](./Common/Services/ConfigService.cs) 系统配置管理。

控制器：

- [/Config/](./Common/Controllers/ConfigController.cs) 系统配置相关 API。
