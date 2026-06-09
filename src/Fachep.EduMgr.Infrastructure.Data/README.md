仓储层抽象
===
实体接口、抽象类和仓储服务、工作单元接口抽象。

[IHasName]
---

| 字段   | 说明 | CLR 类型 | 数据库类型 | 非空 |
|------|----|--------|-------|----|
| Name | 名称 | string | text  |    |

[IHasOwner\<TOwnerKey\>][IHasOwner]
---

| 字段      | 说明     | CLR 类型    | 数据库类型     | 非空   |
|---------|--------|-----------|-----------|------|
| OwnerId | 所有者实体键 | TOwnerKey | TOwnerKey | :ok: |

[IExpirable]
---

| 字段             | 说明    | CLR 类型  | 数据库类型       | 非空   |
|----------------|-------|---------|-------------|------|
| ExpirationTime | 过期时间戳 | Instant | timestamptz | :ok: |

[IRepository\<TEntity\>][IRepository]
---

| 方法名                 | 说明           |
|---------------------|--------------|
| SelectListAsync     | 查询符合条件的实体列表页 |
| CountAsync          | 查询符合条件的实体数量  |
| AddAsync            | 添加实体         |
| UpdateAsync         | 更新实体         |
| RemoveAsync         | 删除实体         |
| LoadReferenceAsync  | 加载实体的引用导航属性  |
| LoadCollectionAsync | 加载实体的集合导航属性  |

[IRepository\<TEntity, in TKey\>][IRepository]
---

| 方法名                      | 说明           |
|--------------------------|--------------|
| SelectFirstByIdAsync     | 根据主键查询单个实体   |
| SelectListByIdRangeAsync | 根据主键集合查询实体列表 |
| RemoveByIdAsync          | 根据主键删除实体     |
| RemoveByIdRangeAsync     | 根据主键集合删除实体列表 |

[IUnitOfWork]
---

| 方法名                      | 说明             |
|--------------------------|----------------|
| BeginTransactionAsync    | 开始事务           |
| CommitTransactionAsync   | 提交事务           |
| RollbackTransactionAsync | 回滚事务           |
| SaveChangesAsync         | 保存更改并返回修改的项目数量 |

[Forwarding 命名空间](./Forwarding) 中包含 IoC 泛型辅助转发服务类。

[IHasName]: ./IHasName.cs
[IHasOwner]: ./IHasOwner.cs
[IExpirable]: ./IExpirable.cs
[IRepository]: ./IRepository.cs
[IUnitOfWork]: ./IUnitOfWork.cs
