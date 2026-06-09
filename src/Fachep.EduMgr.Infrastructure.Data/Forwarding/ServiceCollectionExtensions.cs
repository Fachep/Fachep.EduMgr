using System.Diagnostics.CodeAnalysis;
using Microsoft.Extensions.DependencyInjection;

namespace Fachep.EduMgr.Infrastructure.Data.Forwarding;

public static class ServiceCollectionExtensions
{
    extension(IServiceCollection services)
    {
        public IServiceCollection AddForwardingUnitOfWork(
            [DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.Interfaces)]
            Type implementationType,
            Type defaultContextType)
        {
            return services
                .AddSingleton(new UnitOfWorkTarget(implementationType))
                .AddScoped(typeof(IUnitOfWork<>), typeof(UnitOfWork<>))
                .AddScoped<IUnitOfWork>(sp =>
                    (IUnitOfWork)sp.GetRequiredService(
                        typeof(IUnitOfWork<>).MakeGenericType(defaultContextType)));
        }

        public IServiceCollection AddForwardingUnitOfWork<TDefaultContext>(
            [DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.Interfaces)]
            Type implementationType)
        {
            return services
                .AddSingleton(new UnitOfWorkTarget(implementationType))
                .AddScoped(typeof(IUnitOfWork<>), typeof(UnitOfWork<>))
                .AddScoped<IUnitOfWork>(sp =>
                    sp.GetRequiredService<IUnitOfWork<TDefaultContext>>());
        }

        public IServiceCollection AddForwardingUnitOfWork<
            [DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.Interfaces)]
            TImplementation, TDefaultContext>()
        {
            return services.AddForwardingUnitOfWork<TDefaultContext>(typeof(TImplementation));
        }

        public IServiceCollection AddForwardingRepository(
            [DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.Interfaces)]
            Type implementationType,
            [DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.Interfaces)]
            Type implementationWithKeyType,
            Type defaultContextType)
        {
            return services
                .AddSingleton(new RepositoryTarget(implementationType, implementationWithKeyType,
                    defaultContextType))
                .AddScoped(typeof(IRepositoryWithContext<,,>), typeof(RepositoryWithContext<,,>))
                .AddScoped(typeof(IRepositoryWithContext<,>), typeof(RepositoryWithContext<,>))
                .AddScoped(typeof(IRepository<,>), typeof(Repository<,>))
                .AddScoped(typeof(IRepository<>), typeof(Repository<>));
        }

        public IServiceCollection AddForwardingRepository<TDefaultContext>(
            [DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.Interfaces)]
            Type implementationType,
            [DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.Interfaces)]
            Type implementationWithKeyType)
        {
            return services.AddForwardingRepository(implementationType, implementationWithKeyType,
                typeof(TDefaultContext));
        }

        public IServiceCollection AddForwardingRepository(
            [DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.Interfaces)]
            Type implementationType,
            [DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.Interfaces)]
            Type implementationWithKeyType)
        {
            return services
                .AddSingleton(new RepositoryTarget(implementationType, implementationWithKeyType))
                .AddScoped(typeof(IRepository<,>), typeof(Repository<,>))
                .AddScoped(typeof(IRepository<>), typeof(Repository<>));
        }
    }
}
