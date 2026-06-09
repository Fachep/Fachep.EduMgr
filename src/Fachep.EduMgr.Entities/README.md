数据库实体（表）定义
===

[Class]
---

| 字段      | 说明      | CLR 类型 | 数据库类型  |  主键  |  非空  |
|---------|---------|--------|--------|:----:|:----:|
| Id      | 班级标识    | long   | bigint | :ok: | :ok: |
| Name    | 班级名称    | string | text   |      |      |
| OwnerId | 班主任用户标识 | long   | bigint |      |      |
| MajorId | 所属专业标识  | long   | bigint |      |      |

[Course]
---

| 字段        | 说明     | CLR 类型 | 数据库类型   |  主键  |  非空  |
|-----------|--------|--------|---------|:----:|:----:|
| Id        | 课程标识   | long   | bigint  | :ok: | :ok: |
| SubjectId | 课程科目标识 | long   | bigint  |      | :ok: |
| OwnerId   | 授课教师标识 | long   | bigint  |      |      |
| Locked    | 是否锁定   | bool   | boolean |      | :ok: |

[Department]
---

| 字段   | 说明      | CLR 类型 | 数据库类型  |  主键  |  非空  |
|------|---------|--------|--------|:----:|:----:|
| Id   | 学院或部门标识 | long   | bigint | :ok: | :ok: |
| Name | 学院或部门名称 | string | text   |      | :ok: |

[Enrollment]
---

| 字段       | 说明     | CLR 类型 | 数据库类型   |  主键  |  非空  |
|----------|--------|--------|---------|:----:|:----:|
| OwnerId  | 所属学生标识 | long   | bigint  | :ok: | :ok: |
| CourseId | 课程标识   | long   | bigint  | :ok: | :ok: |
| Locked   | 是否锁定   | bool   | boolean |      | :ok: |

[Major]
---

| 字段      | 说明        | CLR 类型 | 数据库类型  |  主键  |  非空  |
|---------|-----------|--------|--------|:----:|:----:|
| Id      | 专业标识      | long   | bigint | :ok: | :ok: |
| Name    | 专业名称      | string | text   |      | :ok: |
| OwnerId | 所属学院或部门标识 | long   | bigint |      |      |

[Schedule]
---

| 字段       | 说明   | CLR 类型               | 数据库类型     |  主键  |  非空  |
|----------|------|----------------------|-----------|:----:|:----:|
| Id       | 排课标识 | Guid                 | uuid      | :ok: | :ok: |
| OwnerId  | 课程标识 | long                 | bigint    |      | :ok: |
| Weeks    | 排课周次 | NpgsqlRange\<int\>[] | int4range |      | :ok: |
| Days     | 排课日  | NpgsqlRange\<int\>[] | int4range |      | :ok: |
| Sections | 排课节次 | NpgsqlRange\<int\>[] | int4range |      | :ok: |
| Location | 上课地点 | string               | text      |      |      |

[Subject]
---

| 字段      | 说明        | CLR 类型 | 数据库类型  |  主键  |  非空  |
|---------|-----------|--------|--------|:----:|:----:|
| Id      | 课程科目标识    | long   | bigint | :ok: | :ok: |
| Name    | 课程科目名称    | string | text   |      | :ok: |
| OwnerId | 所属学院或部门标识 | long   | bigint |      |      |

[User]
---

| 字段             | 说明               | CLR 类型   | 数据库类型     | 主键   | 非空   |
|----------------|------------------|----------|-----------|------|------|
| Id             | 用户标识             | long     | bigint    | :ok: | :ok: |
| Name           | 用户名              | string   | text      |      |      |
| NormalizedName | 规范化用户名           | string   | text      |      |      |
| PasswordHash   | 密码哈希值            | string   | text      |      |      |
| SecurityStamp  | 安全标识             | string   | text      |      |      |
| UserRole       | 用户角色             | UserRole | enum(...) |      | :ok: |
| DepartmentId   | Teacher 所属系或部门标识 | long     | bigint    |      |      |
| ClassId        | Student 所属班级标识   | long     | bigint    |      |      |

[UserToken]
---

| 字段             | 说明      | CLR 类型  | 数据库类型       | 主键   | 非空   |
|----------------|---------|---------|-------------|------|------|
| OwnerId        | 所属用户标识  | long    | bigint      | :ok: | :ok: |
| DeviceId       | 设备标识    | Guid    | uuid        | :ok: | :ok: |
| Value          | JWT JTI | Guid    | uuid        |      | :ok: |
| ExpirationTime | 过期时间戳   | Instant | timestamptz |      | :ok: |

[Class]: ./Class.cs
[Course]: ./Course.cs
[Department]: ./Department.cs
[Enrollment]: ./Enrollment.cs
[Major]: ./Major.cs
[Schedule]: ./Schedule.cs
[Subject]: ./Subject.cs
[User]: ./User.cs
[UserToken]: ./UserToken.cs
