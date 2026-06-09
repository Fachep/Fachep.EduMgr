namespace Fachep.EduMgr.Infrastructure.Data;

public interface IRepositoryWithContext<out TContext, TEntity> : IRepository<TEntity>,
    IHasContext<TContext>
    where TEntity : class, IEntity;

public interface IRepositoryWithContext<out TContext, TEntity, in TKey> :
    IRepositoryWithContext<TContext, TEntity>,
    IRepository<TEntity, TKey>
    where TEntity : class, IEntity<TKey>
    where TKey : struct, IEquatable<TKey>;
