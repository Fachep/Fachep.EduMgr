namespace Fachep.EduMgr.Infrastructure.Data;

public interface IUnitOfWork
{
    Task BeginTransactionAsync(CancellationToken token = default);
    Task CommitTransactionAsync(CancellationToken token = default);
    Task RollbackTransactionAsync(CancellationToken token = default);
    Task<int> SaveChangesAsync(CancellationToken token = default);
}

public interface IUnitOfWork<TContext> : IUnitOfWork, IHasContext<TContext>;
