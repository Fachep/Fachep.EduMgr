using Microsoft.Extensions.DependencyInjection;

namespace Fachep.EduMgr.Infrastructure.Data.Forwarding;

internal class UnitOfWork<TContext> : IUnitOfWork<TContext>
{
    protected readonly IUnitOfWork<TContext> Implementation;

    public UnitOfWork(IServiceProvider serviceProvider, UnitOfWorkTarget target)
    {
        var implementationType = target.ImplementationType.MakeGenericType(typeof(TContext));
        Implementation =
            (IUnitOfWork<TContext>)serviceProvider.GetRequiredService(implementationType);
    }

    public Task BeginTransactionAsync(CancellationToken token = default)
    {
        return Implementation.BeginTransactionAsync(token);
    }

    public Task CommitTransactionAsync(CancellationToken token = default)
    {
        return Implementation.CommitTransactionAsync(token);
    }

    public Task RollbackTransactionAsync(CancellationToken token = default)
    {
        return Implementation.RollbackTransactionAsync(token);
    }

    public Task<int> SaveChangesAsync(CancellationToken token = default)
    {
        return Implementation.SaveChangesAsync(token);
    }

    public TContext Context => Implementation.Context;
}
