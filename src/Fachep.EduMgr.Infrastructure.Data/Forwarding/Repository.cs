using Microsoft.Extensions.DependencyInjection;

namespace Fachep.EduMgr.Infrastructure.Data.Forwarding;

internal class Repository<TEntity> : IRepository<TEntity>
    where TEntity : class, IEntity
{
    private readonly IRepository<TEntity> _implementation;

    protected Repository(IRepository<TEntity> implementation)
    {
        _implementation = implementation;
    }

    public Repository(IServiceProvider serviceProvider, RepositoryTarget target)
    {
        var implementationType = target.ImplementationType.MakeGenericType(
            target.DefaultContextType is null
                ? [typeof(TEntity)]
                : [target.DefaultContextType, typeof(TEntity)]
        );
        _implementation =
            (IRepository<TEntity>)serviceProvider.GetRequiredService(implementationType);
    }

    public string? TableName => _implementation.TableName;

    public Task<List<TEntity>> SelectListAsync(int limit = 0, int offset = 0,
        IEnumerable<(string columnName, bool ascending)>? orderByColumns = null,
        IEnumerable<KeyValuePair<string[], object?>>? queries = null,
        CancellationToken token = default)
    {
        return _implementation.SelectListAsync(limit, offset, orderByColumns, queries, token);
    }

    public Task<int> CountAsync(IEnumerable<KeyValuePair<string[], object?>>? queries = null,
        CancellationToken token = default)
    {
        return _implementation.CountAsync(queries, token);
    }

    public Task AddAsync(TEntity entity, CancellationToken token = default)
    {
        return _implementation.AddAsync(entity, token);
    }

    public Task AddRangeAsync(IEnumerable<TEntity> entities, CancellationToken token = default)
    {
        return _implementation.AddRangeAsync(entities, token);
    }

    public Task RemoveAsync(TEntity entity, CancellationToken token = default)
    {
        return _implementation.RemoveAsync(entity, token);
    }

    public Task RemoveRangeAsync(IEnumerable<TEntity> entities, CancellationToken token = default)
    {
        return _implementation.RemoveRangeAsync(entities, token);
    }

    public Task UpdateAsync(TEntity entity, CancellationToken token = default)
    {
        return _implementation.UpdateAsync(entity, token);
    }

    public Task UpdateRangeAsync(IEnumerable<TEntity> entities, CancellationToken token = default)
    {
        return _implementation.UpdateRangeAsync(entities, token);
    }

    public Task LoadReferenceAsync(TEntity entity, string propertyName,
        CancellationToken token = default)
    {
        return _implementation.LoadReferenceAsync(entity, propertyName, token);
    }

    public Task LoadCollectionAsync(TEntity entity, string propertyName,
        CancellationToken token = default)
    {
        return _implementation.LoadCollectionAsync(entity, propertyName, token);
    }
}

internal class Repository<TEntity, TKey> : Repository<TEntity>, IRepository<TEntity, TKey>
    where TEntity : class, IEntity<TKey>
    where TKey : struct, IEquatable<TKey>
{
    private readonly IRepository<TEntity, TKey> _implementation;

    protected Repository(IRepository<TEntity, TKey> implementation) : base(implementation)
    {
        _implementation = implementation;
    }

    public Repository(IServiceProvider serviceProvider, RepositoryTarget target) : this(
        GetImplementation(serviceProvider, target))
    {
    }

    public Task<TEntity?> SelectFirstByIdAsync(TKey id, CancellationToken token = default)
    {
        return _implementation.SelectFirstByIdAsync(id, token);
    }

    public Task<List<TEntity>> SelectListByIdRangeAsync(IEnumerable<TKey> ids,
        CancellationToken token = default)
    {
        return _implementation.SelectListByIdRangeAsync(ids, token);
    }

    public IAsyncEnumerable<TEntity?> SelectEnumerateByIdRangeAsync(IEnumerable<TKey> ids,
        CancellationToken token = default)
    {
        return _implementation.SelectEnumerateByIdRangeAsync(ids, token);
    }

    public Task RemoveByIdAsync(TKey id, CancellationToken token = default)
    {
        return _implementation.RemoveByIdAsync(id, token);
    }

    public Task RemoveByIdRangeAsync(IEnumerable<TKey> ids, CancellationToken token = default)
    {
        return _implementation.RemoveByIdRangeAsync(ids, token);
    }

    private static IRepository<TEntity, TKey> GetImplementation(IServiceProvider serviceProvider,
        RepositoryTarget target)
    {
        var implementationType = target.ImplementationWithKeyType.MakeGenericType(
            target.DefaultContextType is null
                ? [typeof(TEntity), typeof(TKey)]
                : [target.DefaultContextType, typeof(TEntity), typeof(TKey)]
        );
        return (IRepository<TEntity, TKey>)serviceProvider.GetRequiredService(implementationType);
    }
}
