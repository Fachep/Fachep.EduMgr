using Microsoft.EntityFrameworkCore;
using NodaTime;

namespace Fachep.EduMgr.Infrastructure.Data;

public static class RepositoryWithContextExtensions
{
    extension<TEntity>(IRepositoryWithContext<DbContext, TEntity> repository)
        where TEntity : class, IEntity
    {
        public IQueryable<TEntity> Queryable => repository.Context.Set<TEntity>();
    }

    extension<TEntity>(IRepositoryWithContext<DbContext, TEntity> repository)
        where TEntity : class, IEntity, IHasName
    {
        public async Task<TEntity?> FindFirstByNameAsync(string name,
            CancellationToken token = default)
        {
            ArgumentException.ThrowIfNullOrWhiteSpace(name);
            token.ThrowIfCancellationRequested();
            return await repository.Queryable
                .FirstOrDefaultAsync(e => e.Name == name, token);
        }

        public async Task<List<TEntity>> FindManyByNameAsync(string name,
            CancellationToken token = default)
        {
            ArgumentException.ThrowIfNullOrWhiteSpace(name);
            token.ThrowIfCancellationRequested();
            return await repository.Queryable
                .Where(e => e.Name == name)
                .ToListAsync(token);
        }

        public async Task<List<TEntity>> FindByNamesAsync(IEnumerable<string> names,
            CancellationToken token = default)
        {
            token.ThrowIfCancellationRequested();
            return await repository.Queryable
                .Where(e => names.Contains(e.Name))
                .ToListAsync(token);
        }

        public async Task<List<TEntity>> GetListOrderedByNameAsync(bool ascending = true,
            CancellationToken token = default)
        {
            token.ThrowIfCancellationRequested();
            return ascending
                ? await repository.Queryable.OrderBy(e => e.Name).ToListAsync(token)
                : await repository.Queryable.OrderByDescending(e => e.Name).ToListAsync(token);
        }

        public async Task<List<TEntity>> GetPageOrderedByNameAsync(int limit, int offset = 0,
            bool ascending = true,
            CancellationToken token = default)
        {
            token.ThrowIfCancellationRequested();
            return ascending
                ? await repository.Queryable.OrderBy(e => e.Name).Skip(offset).Take(limit)
                    .ToListAsync(token)
                : await repository.Queryable.OrderByDescending(e => e.Name).Skip(offset).Take(limit)
                    .ToListAsync(token);
        }
    }

    extension<TEntity, TKey>(IRepositoryWithContext<DbContext, TEntity, TKey> repository)
        where TEntity : class, IEntity<TKey>, IHasName
        where TKey : struct, IEquatable<TKey>
    {
        public async Task<TKey?> FindFirstIdByNameAsync(string name,
            CancellationToken token = default)
        {
            ArgumentException.ThrowIfNullOrWhiteSpace(name);
            token.ThrowIfCancellationRequested();
            return await repository.Queryable
                .Where(e => e.Name == name)
                .Select(e => (TKey?)e.Id)
                .FirstOrDefaultAsync(token);
        }

        public async Task<List<TKey>> FindManyIdsByNameAsync(string name,
            CancellationToken token = default)
        {
            ArgumentException.ThrowIfNullOrWhiteSpace(name);
            token.ThrowIfCancellationRequested();
            return await repository.Queryable
                .Where(e => e.Name == name)
                .Select(e => e.Id)
                .ToListAsync(token);
        }

        public async Task<List<TKey>> FindIdsByNamesAsync(IEnumerable<string> names,
            CancellationToken token = default)
        {
            token.ThrowIfCancellationRequested();
            return await repository.Queryable
                .Where(e => names.Contains(e.Name))
                .Select(e => e.Id)
                .ToListAsync(token);
        }

        public async Task<List<TKey>> GetIdListOrderedByNameAsync(bool ascending = true,
            CancellationToken token = default)
        {
            token.ThrowIfCancellationRequested();
            return ascending
                ? await repository.Queryable.OrderBy(e => e.Name).Select(e => e.Id)
                    .ToListAsync(token)
                : await repository.Queryable.OrderByDescending(e => e.Name).Select(e => e.Id)
                    .ToListAsync(token);
        }

        public async Task<List<TKey>> GetIdPageOrderedByNameAsync(int limit, int offset = 0,
            bool ascending = true,
            CancellationToken token = default)
        {
            token.ThrowIfCancellationRequested();
            return ascending
                ? await repository.Queryable.OrderBy(e => e.Name).Skip(offset).Take(limit)
                    .Select(e => e.Id)
                    .ToListAsync(token)
                : await repository.Queryable.OrderByDescending(e => e.Name).Skip(offset).Take(limit)
                    .Select(e => e.Id)
                    .ToListAsync(token);
        }

        public async Task<string?> FindNameByIdAsync(TKey id, CancellationToken token = default)
        {
            token.ThrowIfCancellationRequested();
            return await repository.Queryable
                .Where(e => e.Id.Equals(id))
                .Select(e => e.Name)
                .FirstAsync(token);
        }
    }

    extension<TEntity, TOwnerKey>(IRepositoryWithContext<DbContext, TEntity> repository)
        where TEntity : class, IEntity, IHasOwner<TOwnerKey>
        where TOwnerKey : struct, IEquatable<TOwnerKey>
    {
        public async Task<TEntity?> FindFirstByOwnerIdAsync(TOwnerKey ownerId,
            CancellationToken token = default)
        {
            token.ThrowIfCancellationRequested();
            return await repository.Queryable
                .FirstOrDefaultAsync(e => e.OwnerId.Equals(ownerId), token);
        }

        public async Task<List<TEntity>> FindManyByOwnerIdAsync(TOwnerKey ownerId,
            CancellationToken token = default)
        {
            token.ThrowIfCancellationRequested();
            return await repository.Queryable
                .Where(e => e.OwnerId.Equals(ownerId))
                .ToListAsync(token);
        }

        public async Task<List<TEntity>> GetListOrderedByOwnerIdAsync(bool ascending = true,
            CancellationToken token = default)
        {
            token.ThrowIfCancellationRequested();
            return ascending
                ? await repository.Queryable.OrderBy(e => e.OwnerId).ToListAsync(token)
                : await repository.Queryable.OrderByDescending(e => e.OwnerId).ToListAsync(token);
        }

        public async Task<List<TEntity>> GetPageOrderedByOwnerIdAsync(int limit, int offset = 0,
            bool ascending = true,
            CancellationToken token = default)
        {
            token.ThrowIfCancellationRequested();
            return ascending
                ? await repository.Queryable.OrderBy(e => e.OwnerId).Skip(offset).Take(limit)
                    .ToListAsync(token)
                : await repository.Queryable.OrderByDescending(e => e.OwnerId).Skip(offset)
                    .Take(limit)
                    .ToListAsync(token);
        }
    }

    extension<TEntity, TKey, TOwnerKey>(IRepositoryWithContext<DbContext, TEntity, TKey> repository)
        where TEntity : class, IEntity<TKey>, IHasOwner<TOwnerKey>
        where TKey : struct, IEquatable<TKey>
        where TOwnerKey : struct, IEquatable<TOwnerKey>
    {
        public async Task<TKey?> FindFirstIdByOwnerIdAsync(TOwnerKey ownerId,
            CancellationToken token = default)
        {
            token.ThrowIfCancellationRequested();
            return await repository.Queryable
                .Where(e => e.OwnerId.Equals(ownerId))
                .Select(e => (TKey?)e.Id)
                .FirstOrDefaultAsync(token);
        }

        public async Task<List<TKey>> FindManyIdsByOwnerIdAsync(TOwnerKey ownerId,
            CancellationToken token = default)
        {
            token.ThrowIfCancellationRequested();
            return await repository.Queryable
                .Where(e => e.OwnerId.Equals(ownerId))
                .Select(e => e.Id)
                .ToListAsync(token);
        }

        public async Task<List<TKey>> GetIdListOrderedByOwnerIdAsync(bool ascending = true,
            CancellationToken token = default)
        {
            token.ThrowIfCancellationRequested();
            return ascending
                ? await repository.Queryable.OrderBy(e => e.OwnerId).Select(e => e.Id)
                    .ToListAsync(token)
                : await repository.Queryable.OrderByDescending(e => e.OwnerId).Select(e => e.Id)
                    .ToListAsync(token);
        }

        public async Task<List<TKey>> GetIdPageOrderedByOwnerIdAsync(int limit, int offset = 0,
            bool ascending = true,
            CancellationToken token = default)
        {
            token.ThrowIfCancellationRequested();
            return ascending
                ? await repository.Queryable.OrderBy(e => e.OwnerId).Skip(offset).Take(limit)
                    .Select(e => e.Id)
                    .ToListAsync(token)
                : await repository.Queryable.OrderByDescending(e => e.OwnerId).Skip(offset)
                    .Take(limit)
                    .Select(e => e.Id).ToListAsync(token);
        }

        public async Task<TOwnerKey?> FindOwnerIdByIdAsync(TKey id,
            CancellationToken token = default)
        {
            token.ThrowIfCancellationRequested();
            return await repository.Queryable
                .Where(e => e.Id.Equals(id))
                .Select(e => e.OwnerId)
                .FirstOrDefaultAsync(token);
        }
    }

    extension<TEntity, TKey, TOwnerKey, TOwner>(
        IRepositoryWithContext<DbContext, TEntity, TKey> repository)
        where TEntity : class, IEntity<TKey>, IHasOwner<TOwnerKey, TOwner>
        where TOwner : class, IEntity<TOwnerKey>
        where TKey : struct, IEquatable<TKey>
        where TOwnerKey : struct, IEquatable<TOwnerKey>
    {
        public async Task<TOwner?> FindOwnerByIdAsync(TKey id, CancellationToken token = default)
        {
            token.ThrowIfCancellationRequested();
            return await repository.Queryable
                .Where(e => e.Id.Equals(id))
                .Select(e => e.Owner)
                .FirstOrDefaultAsync(token);
        }
    }

    extension<TEntity>(IRepositoryWithContext<DbContext, TEntity> repository)
        where TEntity : class, IEntity, IExpirable
    {
        public async Task<int> RemoveExpiredAtNowAsync(CancellationToken token = default)
        {
            token.ThrowIfCancellationRequested();
            return await repository.Queryable
                .Where(e => e.ExpirationTime <= SystemClock.Instance.GetCurrentInstant())
                .ExecuteDeleteAsync(token);
        }

        public async Task<int> RemoveExpiredAsync(Instant when, CancellationToken token = default)
        {
            token.ThrowIfCancellationRequested();
            return await repository.Queryable
                .Where(e => e.ExpirationTime <= when)
                .ExecuteDeleteAsync(token);
        }


        public async Task<int> CountExpiredAtNowAsync(CancellationToken token = default)
        {
            token.ThrowIfCancellationRequested();
            return await repository.Queryable
                .Where(e => e.ExpirationTime <= SystemClock.Instance.GetCurrentInstant())
                .CountAsync(token);
        }

        public async Task<int> CountExpiredAsync(Instant when, CancellationToken token = default)
        {
            token.ThrowIfCancellationRequested();
            return await repository.Queryable
                .Where(e => e.ExpirationTime <= when)
                .CountAsync(token);
        }
    }
}
