using Microsoft.Extensions.DependencyInjection;

namespace Fachep.EduMgr.Infrastructure.Data.Forwarding;

internal class RepositoryWithContext<TContext, TEntity>
    : Repository<TEntity>, IRepositoryWithContext<TContext, TEntity>
    where TEntity : class, IEntity
{
    private readonly IRepositoryWithContext<TContext, TEntity> _implementation;

    protected RepositoryWithContext(IRepositoryWithContext<TContext, TEntity> implementation)
        : base(implementation)
    {
        _implementation = implementation;
    }

    public RepositoryWithContext(IServiceProvider serviceProvider, RepositoryTarget target) : this(
        GetImplementation(serviceProvider, target))
    {
    }

    public TContext Context => _implementation.Context;

    private static IRepositoryWithContext<TContext, TEntity> GetImplementation(
        IServiceProvider serviceProvider,
        RepositoryTarget target)
    {
        var implementationType =
            target.ImplementationType.MakeGenericType(typeof(TContext), typeof(TEntity));
        return (IRepositoryWithContext<TContext, TEntity>)serviceProvider.GetRequiredService(
            implementationType);
    }
}

internal class RepositoryWithContext<TContext, TEntity, TKey>
    : Repository<TEntity, TKey>, IRepositoryWithContext<TContext, TEntity, TKey>
    where TEntity : class, IEntity<TKey>
    where TKey : struct, IEquatable<TKey>
{
    private readonly IRepositoryWithContext<TContext, TEntity, TKey> _implementation;

    protected RepositoryWithContext(IRepositoryWithContext<TContext, TEntity, TKey> implementation)
        : base(implementation)
    {
        _implementation = implementation;
    }

    public RepositoryWithContext(IServiceProvider serviceProvider, RepositoryTarget target) : this(
        GetImplementation(serviceProvider, target))
    {
    }

    public TContext Context => _implementation.Context;

    private static IRepositoryWithContext<TContext, TEntity, TKey> GetImplementation(
        IServiceProvider serviceProvider,
        RepositoryTarget target)
    {
        var implementationType =
            target.ImplementationWithKeyType.MakeGenericType(typeof(TContext), typeof(TEntity),
                typeof(TKey));
        return (IRepositoryWithContext<TContext, TEntity, TKey>)serviceProvider.GetRequiredService(
            implementationType);
    }
}
