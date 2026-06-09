using Fachep.EduMgr.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Quartz;

namespace Fachep.EduMgr.Background.Jobs;

public class ExpirationJob<TContext, TEntity>(
    IRepositoryWithContext<TContext, TEntity> repository,
    ILogger<ExpirationJob<TContext, TEntity>> logger) : IJob
    where TContext : DbContext
    where TEntity : class, IEntity, IExpirable
{
    public async Task Execute(IJobExecutionContext context)
    {
        logger.LogInformation(
            "Starting expiration job for {EntityType} in {Context}",
            typeof(TEntity),
            typeof(TContext)
        );
        var count = await repository.RemoveExpiredAtNowAsync(context.CancellationToken);
        logger.LogInformation(
            "Expiration job completed for {EntityType} in {Context}, removed {Count} expired records",
            typeof(TEntity),
            typeof(TContext),
            count
        );
    }
}
