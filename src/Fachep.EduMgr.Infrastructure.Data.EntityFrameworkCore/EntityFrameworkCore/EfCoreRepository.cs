using System.Diagnostics.CodeAnalysis;
using System.Linq.Expressions;
using System.Reflection;
using System.Runtime.CompilerServices;
using Fachep.EduMgr.Infrastructure.Common;
using Microsoft.EntityFrameworkCore;

namespace Fachep.EduMgr.Infrastructure.Data.EntityFrameworkCore;

internal static class EfCoreRepository
{
    public static readonly MethodInfo PropertyMethodInfo =
        typeof(EF).GetMethod(nameof(EF.Property), BindingFlags.Public | BindingFlags.Static)!;

    public static readonly MethodInfo ContainsMethodInfo =
        typeof(ICollection<object>).GetMethod(nameof(ICollection<>.Contains))!;
}

public class EfCoreRepository<TEntity>(DbContext context) : IRepository<TEntity>
    where TEntity : class, IEntity
{
    protected DbSet<TEntity> Set => context.Set<TEntity>();

    public string? TableName => Set.EntityType.GetTableName();

    public async Task<List<TEntity>> SelectListAsync(int limit = 0, int offset = 0,
        IEnumerable<(string columnName, bool ascending)>? orderByColumns = null,
        IEnumerable<KeyValuePair<string[], object?>>? queries = null,
        CancellationToken token = default)
    {
        token.ThrowIfCancellationRequested();
        IQueryable<TEntity> query = Set;

        if (orderByColumns is not null)
            foreach (var (columnName, ascending) in orderByColumns)
            {
                Expression<Func<TEntity, object>>
                    selector = e => EF.Property<object>(e, columnName);
                if (query is IOrderedQueryable<TEntity> orderedQueryable)
                    query = ascending
                        ? orderedQueryable.ThenBy(selector)
                        : orderedQueryable.ThenByDescending(selector);
                else
                    query = ascending ? query.OrderBy(selector) : query.OrderByDescending(selector);
            }

        if (queries is not null) ApplyQueries(ref query, queries);

        query = query.Skip(offset);
        if (limit > 0) query = query.Take(limit);

        return await query.ToListAsync(token);
    }

    public async Task<int> CountAsync(IEnumerable<KeyValuePair<string[], object?>>? queries = null,
        CancellationToken token = default)
    {
        token.ThrowIfCancellationRequested();
        var query = Set.AsQueryable();
        if (queries is not null) ApplyQueries(ref query, queries);
        return await query.CountAsync(token);
    }

    public async Task AddAsync(TEntity entity, CancellationToken token = default)
    {
        token.ThrowIfCancellationRequested();
        await Set.AddAsync(entity, token);
    }

    public async Task AddRangeAsync(IEnumerable<TEntity> entities,
        CancellationToken token = default)
    {
        token.ThrowIfCancellationRequested();
        await Set.AddRangeAsync(entities, token);
    }

    public Task RemoveAsync(TEntity entity, CancellationToken token = default)
    {
        return TaskUtils.Try(() => Set.Remove(entity), token);
    }

    public Task RemoveRangeAsync(IEnumerable<TEntity> entities, CancellationToken token = default)
    {
        return TaskUtils.Try(() => Set.RemoveRange(entities), token);
    }

    public Task UpdateAsync(TEntity entity, CancellationToken token = default)
    {
        return TaskUtils.Try(() => Set.Update(entity), token);
    }

    public Task UpdateRangeAsync(IEnumerable<TEntity> entities, CancellationToken token = default)
    {
        return TaskUtils.Try(() => Set.UpdateRange(entities), token);
    }

    public async Task LoadReferenceAsync(TEntity entity, string propertyName,
        CancellationToken token = default)
    {
        ArgumentNullException.ThrowIfNull(entity);
        ArgumentException.ThrowIfNullOrWhiteSpace(propertyName);
        token.ThrowIfCancellationRequested();
        await Set.Entry(entity)
            .Reference(propertyName)
            .LoadAsync(token);
    }

    public async Task LoadCollectionAsync(TEntity entity, string propertyName,
        CancellationToken token = default)
    {
        ArgumentNullException.ThrowIfNull(entity);
        ArgumentException.ThrowIfNullOrWhiteSpace(propertyName);
        token.ThrowIfCancellationRequested();
        await Set.Entry(entity)
            .Collection(propertyName)
            .LoadAsync(token);
    }

    protected Expression<Func<TEntity, bool>> MakeContainsPredicate(string columnName, object item)
    {
        var type = item.GetType();
        var constExpr = Expression.Constant(new { columnName, item });
        Console.WriteLine(constExpr);
        var itemExpr = Expression.PropertyOrField(constExpr, nameof(item));
        var itemTypedExpr = Expression.Convert(itemExpr, type);
        var columnExpr = Expression.PropertyOrField(constExpr, nameof(columnName));
        var entityExpr = Expression.Parameter(typeof(TEntity), "e");
        var propertyExpr = Expression.Call(
            EfCoreRepository.PropertyMethodInfo.MakeGenericMethod(typeof(ICollection<object>)),
            entityExpr,
            columnExpr
        );

        var containsExpr = Expression.Call(
            propertyExpr,
            EfCoreRepository.ContainsMethodInfo,
            itemTypedExpr
        );
        return Expression.Lambda<Func<TEntity, bool>>(containsExpr, entityExpr);
    }

    protected static void ApplyQueries(
        ref IQueryable<TEntity> queryable,
        IEnumerable<KeyValuePair<string[], object?>> queries)
    {
        foreach (var (paths, value) in queries)
        {
            var efProperty = EfCoreRepository.PropertyMethodInfo.MakeGenericMethod(typeof(object));
            var paramExpr = Expression.Parameter(typeof(TEntity), "e");
            Expression expr = paramExpr;
            foreach (var path in paths[..^1])
                expr = Expression.Call(efProperty, expr, Expression.Constant(path));
            if (paths.Length > 0)
                expr = Expression.Call(
                    EfCoreRepository.PropertyMethodInfo.MakeGenericMethod(value?.GetType() ??
                        typeof(object)),
                    expr, Expression.Constant(paths[^1])
                );
            var body = Expression.Equal(expr, Expression.Constant(value));
            var predicate = Expression.Lambda<Func<TEntity, bool>>(body, paramExpr);
            queryable = queryable.Where(predicate);
        }
    }
}

public class EfCoreRepository<
    [DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors |
                                DynamicallyAccessedMemberTypes.NonPublicConstructors |
                                DynamicallyAccessedMemberTypes.PublicProperties)]
    TEntity, TKey>(DbContext context)
    : EfCoreRepository<TEntity>(context), IRepository<TEntity, TKey>
    where TEntity : class, IEntity<TKey>
    where TKey : struct, IEquatable<TKey>
{
    protected Func<TKey, TEntity>? EntityWithKeyFactory { get; } = CreateEntityWithKeyFactory();

    public async Task<TEntity?> SelectFirstByIdAsync(TKey id, CancellationToken token = default)
    {
        token.ThrowIfCancellationRequested();
        return await Set.Where(e => id.Equals(e.Id)).FirstOrDefaultAsync(token);
    }

    public Task<List<TEntity>> SelectListByIdRangeAsync(IEnumerable<TKey> ids,
        CancellationToken token = default)
    {
        token.ThrowIfCancellationRequested();
        return Set.Where(e => ids.Contains(e.Id)).ToListAsync(token);
    }

    public async IAsyncEnumerable<TEntity?> SelectEnumerateByIdRangeAsync(IEnumerable<TKey> ids,
        [EnumeratorCancellation] CancellationToken token = default)
    {
        foreach (var id in ids)
            yield return await Set.Where(e => id.Equals(e.Id)).FirstOrDefaultAsync(token);
    }

    public async Task RemoveByIdAsync(TKey id, CancellationToken token = default)
    {
        ThrowIfNoEntityWithKeyFactory();
        token.ThrowIfCancellationRequested();
        var entity = await SelectFirstByIdAsync(id, token);
        if (entity is not null) await RemoveAsync(entity, token);
    }

    public async Task RemoveByIdRangeAsync(IEnumerable<TKey> ids, CancellationToken token = default)
    {
        ThrowIfNoEntityWithKeyFactory();
        token.ThrowIfCancellationRequested();
        var entities = Set.Where(e => ids.Contains(e.Id));
        await RemoveRangeAsync(entities, token);
    }

    [MemberNotNull(nameof(EntityWithKeyFactory))]
    protected void ThrowIfNoEntityWithKeyFactory()
    {
        if (EntityWithKeyFactory is null)
            throw new InvalidOperationException(
                $"Cannot create entity of type {typeof(TEntity)} with key of type {typeof(TKey)}. Ensure that {typeof(TEntity)} has a constructor that takes a single parameter of type {typeof(TKey)} or has a parameterless constructor and a writable property 'Id' of type {typeof(TKey)}.");
    }

    private static Func<TKey, TEntity>? CreateEntityWithKeyFactory()
    {
        const BindingFlags ctorAttr =
            BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance;
        if (typeof(TEntity).GetConstructor(ctorAttr, [typeof(TKey)]) is { } ctorWithId)
        {
            var idExpr = Expression.Parameter(typeof(TKey), "id");
            var expr = Expression.New(ctorWithId, idExpr);
            var lambda = Expression.Lambda<Func<TKey, TEntity>>(expr, idExpr);
            return lambda.Compile();
        }

        if (typeof(TEntity).GetProperty(nameof(IEntity<>.Id)) is { CanWrite: true } id &&
            typeof(TEntity).GetConstructor(ctorAttr, []) is { } ctor)
        {
            var idExpr = Expression.Parameter(typeof(TKey), "id");
            var newExpr = Expression.New(ctor);
            var initExpr = Expression.MemberInit(newExpr, Expression.Bind(id, idExpr));
            var lambda = Expression.Lambda<Func<TKey, TEntity>>(initExpr, idExpr);
            return lambda.Compile();
        }

        return null;
    }
}
