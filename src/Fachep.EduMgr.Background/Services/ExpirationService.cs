using System.Reflection;
using Fachep.EduMgr.Background.Configurations;
using Fachep.EduMgr.Background.Jobs;
using Fachep.EduMgr.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Quartz;
using Quartz.Spi;

namespace Fachep.EduMgr.Background.Services;

public class ExpirationService(
    IOptions<ExpirationOption> options,
    IJobFactory jobFactory,
    ISchedulerFactory schedulerFactory,
    ILogger<ExpirationService> logger) : BackgroundService
{
    private const string DefaultCron = "0 0 0 * * ?";
    private IScheduler? _scheduler;

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _scheduler = await schedulerFactory.GetScheduler(stoppingToken);
        _scheduler.JobFactory = jobFactory;

        var contextOptions = options.Value
            .Select(kv => (Type.GetType(kv.Key), kv.Value))
            .Where(kv => kv.Item1 is
                { IsClass: true, IsAbstract: false, IsInterface: false, IsGenericType: false })
            .Where(kv => typeof(DbContext).IsAssignableFrom(kv.Item1));
        foreach (var (contextType, contextOption) in contextOptions)
            await ScheduleContext(contextType!, contextOption, stoppingToken);
    }

    private async Task ScheduleContext(Type contextType, ExpirationOption.PerContextOption option,
        CancellationToken token)
    {
        if (_scheduler is null)
            throw new InvalidOperationException("Scheduler is not initialized.");

        var entities = option.Assemblies
            .Select(Assembly.Load)
            .SelectMany(a => a.GetTypes())
            .Where(t => t is
                { IsClass: true, IsAbstract: false, IsGenericType: false, IsInterface: false })
            .Where(t =>
                typeof(IExpirable).IsAssignableFrom(t) && typeof(IEntity).IsAssignableFrom(t));
        var excludeLookup = option.ExcludeEntities.GetAlternateLookup<ReadOnlySpan<char>>();
        var scheduleLookup = option.Schedules.GetAlternateLookup<ReadOnlySpan<char>>();
        excludeLookup.TryGetValue("*", out var excludeAll);
        if (!scheduleLookup.TryGetValue("*", out var defaultCron)) defaultCron = DefaultCron;

        var count = 0;
        foreach (var entity in entities)
        {
            var entityName = entity.FullName;
            var cron = defaultCron;
            if (!string.IsNullOrWhiteSpace(entityName))
            {
                var span = entityName.AsSpan();
                var skip = false;
                var foundCron = false;
                while (span.Length > 0)
                {
                    if (excludeLookup.TryGetValue(span, out var exclude) && exclude)
                    {
                        skip = true;
                        break;
                    }

                    if (!foundCron && scheduleLookup.TryGetValue(span, out var c))
                    {
                        foundCron = true;
                        cron = c;
                    }

                    var idx = span.LastIndexOf('.');
                    if (idx >= 0)
                        span = span[..idx];
                    else
                        break;
                }

                if (skip || excludeAll) continue;
            }

            var jobType = typeof(ExpirationJob<,>).MakeGenericType(contextType, entity);
            var jobDetail = JobBuilder.Create(jobType)
                .WithIdentity($"ExpirationJob[{contextType.FullName},{entity.FullName}]",
                    "ExpirationJobs")
                .Build();
            var trigger = TriggerBuilder.Create()
                .ForJob(jobDetail)
                .WithCronSchedule(cron)
                .StartNow()
                .WithIdentity($"ExpirationTrigger[{contextType.FullName},{entity.FullName}]",
                    "ExpirationTriggers")
                .Build();
            await _scheduler.ScheduleJob(jobDetail, trigger, token);
            logger.LogInformation(
                "Scheduled expiration job for entity {Entity} in context {Context} with cron {Cron}",
                entity.FullName, contextType.FullName, cron);
            count++;
        }

        logger.LogInformation("Scheduled {Count} expiration jobs for context {Context}", count,
            contextType.FullName);
    }
}
