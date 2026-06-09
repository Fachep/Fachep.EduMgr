using Microsoft.EntityFrameworkCore;

namespace Fachep.EduMgr.Infrastructure.Data.EntityFrameworkCore;

public class EfCoreUnitOfWork(DbContext context) : IUnitOfWork
{
    public Task BeginTransactionAsync(CancellationToken token = default)
    {
        return context.Database.BeginTransactionAsync(token);
    }

    public Task CommitTransactionAsync(CancellationToken token = default)
    {
        return context.Database.CommitTransactionAsync(token);
    }

    public Task RollbackTransactionAsync(CancellationToken token = default)
    {
        return context.Database.RollbackTransactionAsync(token);
    }

    public Task<int> SaveChangesAsync(CancellationToken token = default)
    {
        return context.SaveChangesAsync(token);
    }
}

public class EfCoreUnitOfWork<TContext>(TContext context)
    : EfCoreUnitOfWork(context), IUnitOfWork<TContext>
    where TContext : DbContext
{
    public TContext Context { get; } = context;
}
