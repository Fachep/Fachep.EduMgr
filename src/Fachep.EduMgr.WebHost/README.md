后端主机
===
ASP.NET Core WebAPI 主机项目，负责托管和运行后端 WebAPI 服务。

迁移数据库
---
启动后端后，可通过 `POST /Setup/MigrateDatabase` 执行数据库迁移操作，确保数据库结构与实体定义保持一致。

开发时业务数据生成
---
启动后端后，可通过 `POST /Setup/GenerateDemoData` 执行使用 Bogus 自动生成业务数据用于开发和测试。
