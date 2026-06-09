using Microsoft.EntityFrameworkCore;

namespace Fachep.EduMgr.Infrastructure.Data.EntityFrameworkCore;

public class EfCoreRepositoryWithContext<TContext, TEntity>(TContext context)
    : EfCoreRepository<TEntity>(context),
        IRepositoryWithContext<TContext, TEntity>
    where TContext : DbContext
    where TEntity : class, IEntity
{
    public TContext Context { get; } = context;
}

public class EfCoreRepositoryWithContext<TContext, TEntity, TKey>(TContext context)
    : EfCoreRepository<TEntity, TKey>(context),
        IRepositoryWithContext<TContext, TEntity, TKey>
    where TContext : DbContext
    where TEntity : class, IEntity<TKey>
    where TKey : struct, IEquatable<TKey>
{
    public TContext Context { get; } = context;
}
