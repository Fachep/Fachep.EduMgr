namespace Fachep.EduMgr.Infrastructure.Data;

public interface IRepository<TEntity>
    where TEntity : class, IEntity
{
    string? TableName { get; }

    Task<List<TEntity>> SelectListAsync(
        int limit = 0, int offset = 0,
        IEnumerable<(string columnName, bool ascending)>? orderByColumns = null,
        IEnumerable<KeyValuePair<string[], object?>>? queries = null,
        CancellationToken token = default
    );

    Task<int> CountAsync(IEnumerable<KeyValuePair<string[], object?>>? queries = null,
        CancellationToken token = default);

    Task AddAsync(TEntity entity, CancellationToken token = default);
    Task AddRangeAsync(IEnumerable<TEntity> entities, CancellationToken token = default);

    Task RemoveAsync(TEntity entity, CancellationToken token = default);
    Task RemoveRangeAsync(IEnumerable<TEntity> entities, CancellationToken token = default);

    Task UpdateAsync(TEntity entity, CancellationToken token = default);
    Task UpdateRangeAsync(IEnumerable<TEntity> entities, CancellationToken token = default);

    Task LoadReferenceAsync(TEntity entity, string propertyName, CancellationToken token = default);

    Task LoadCollectionAsync(TEntity entity, string propertyName,
        CancellationToken token = default);
}

public interface IRepository<TEntity, in TKey> : IRepository<TEntity>
    where TEntity : class, IEntity<TKey>
    where TKey : struct, IEquatable<TKey>
{
    Task<TEntity?> SelectFirstByIdAsync(TKey id, CancellationToken token = default);

    Task<List<TEntity>> SelectListByIdRangeAsync(IEnumerable<TKey> ids,
        CancellationToken token = default);

    IAsyncEnumerable<TEntity?> SelectEnumerateByIdRangeAsync(IEnumerable<TKey> ids,
        CancellationToken token = default);

    Task RemoveByIdAsync(TKey id, CancellationToken token = default);
    Task RemoveByIdRangeAsync(IEnumerable<TKey> ids, CancellationToken token = default);
}
