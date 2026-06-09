前端
===
本前端项目分为两个包：

[app](./packages/app)
---
前端 SPA 应用主体，纯 Vibe 产物。

主要技术栈：[Vite](https://vitejs.dev/), [Vue 3](https://vuejs.org/), [Element Plus](https://element-plus.org/),
    [Pinia](https://pinia.vuejs.org/), [Vue Router](https://router.vuejs.org/)

[openapi](./packages/openapi)
---
由后端 OpenAPI 规范，使用 [OpenAPI Generator](https://openapi-generator.tech/) 自动生成的客户端，供 app 包调用。

生成方法：

1. 运行 WebHost 或 AppHost，等待后端服务启动。
2. 执行 `pnpm run generate-api`
