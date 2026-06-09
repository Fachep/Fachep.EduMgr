using Fachep.EduMgr.Infrastructure.Data.EntityFrameworkCore;
using Fachep.EduMgr.Infrastructure.Data.Forwarding;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Fachep.EduMgr.Infrastructure.Data;

public static class ServiceCollectionExtensions
{
    extension(IServiceCollection services)
    {
        public IServiceCollection AddEfCoreUnitOfWork()
        {
            return services
                .AddScoped<EfCoreUnitOfWork>()
                .AddScoped<IUnitOfWork>(sp => sp.GetRequiredService<EfCoreUnitOfWork>());
        }

        public IServiceCollection AddEfCoreUnitOfWork<TDefaultContext>()
            where TDefaultContext : DbContext
        {
            return services
                .AddScoped(typeof(EfCoreUnitOfWork<>))
                .AddScoped<EfCoreUnitOfWork>(sp =>
                    sp.GetRequiredService<EfCoreUnitOfWork<TDefaultContext>>())
                .AddForwardingUnitOfWork<TDefaultContext>(typeof(EfCoreUnitOfWork<>));
        }

        public IServiceCollection AddEfCoreUnitOfWork<TDefaultContext>(Type defaultContextType)
        {
            if (!typeof(DbContext).IsAssignableFrom(defaultContextType))
                throw new ArgumentException($"{defaultContextType} is not a DbContext");

            return services
                .AddScoped(typeof(EfCoreUnitOfWork<>))
                .AddScoped<EfCoreUnitOfWork>(sp =>
                    (EfCoreUnitOfWork)sp.GetRequiredService(
                        typeof(EfCoreUnitOfWork<>).MakeGenericType(defaultContextType)))
                .AddForwardingUnitOfWork<TDefaultContext>(typeof(EfCoreUnitOfWork<>));
        }

        public IServiceCollection AddEfCoreRepository()
        {
            return services
                .AddScoped(typeof(EfCoreRepository<>))
                .AddScoped(typeof(EfCoreRepository<,>))
                .AddForwardingRepository(typeof(EfCoreRepository<>), typeof(EfCoreRepository<,>));
        }

        public IServiceCollection AddEfCoreRepository<TDefaultContext>()
            where TDefaultContext : DbContext
        {
            return services
                .AddScoped(typeof(EfCoreRepositoryWithContext<,>))
                .AddScoped(typeof(EfCoreRepositoryWithContext<,,>))
                .AddForwardingRepository<TDefaultContext>(typeof(EfCoreRepositoryWithContext<,>),
                    typeof(EfCoreRepositoryWithContext<,,>));
        }

        public IServiceCollection AddEfCoreRepository(Type defaultContextType)
        {
            if (!typeof(DbContext).IsAssignableFrom(defaultContextType))
                throw new ArgumentException($"{defaultContextType} is not a DbContext");

            return services
                .AddScoped(typeof(EfCoreRepositoryWithContext<,>))
                .AddScoped(typeof(EfCoreRepositoryWithContext<,,>))
                .AddForwardingRepository(typeof(EfCoreRepositoryWithContext<,>),
                    typeof(EfCoreRepositoryWithContext<,,>), defaultContextType);
        }
    }
}
