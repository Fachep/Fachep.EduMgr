后台任务主机
===
可执行程序，用于定期清理数据库中过期条目等后台任务。

[过期服务](./Services/ExpirationService.cs)
---
根据配置，运行时反射扫描需要过期的数据库上下文和实体类，使用Quartz定时清理数据库中的过期条目。

配置示例（appsettings.json）：
```json
{
  "Expiration": {
    "MyProject.MyDatabase.MyDbContext, MyProject.MyDatabase, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null": {
      "Assemblies": [
        "MyProject.MyDatabase.Entities"
      ],
      "Schedules": {
        "*": "0 0 0 * * ?",
        "MyProject.MyDatabase.Entities.Foo": "0 0 * * * ?"
      }
    }
  }
}
```
