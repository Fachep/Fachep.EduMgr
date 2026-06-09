数据库上下文和迁移
===
EFCore 数据库上下文定义和迁移文件。

修改实体定义和配置后需要运行 `dotnet ef migrations add <MigrationName> -p Fachep.EduMgr.Database -s Fachep.EduMgr.WebHost` 生成新的迁移文件。
