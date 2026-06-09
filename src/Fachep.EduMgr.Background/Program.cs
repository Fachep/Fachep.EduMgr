using Fachep.EduMgr.Background.Configurations;
using Fachep.EduMgr.Background.Services;
using Fachep.EduMgr.Database;
using Fachep.EduMgr.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Quartz;

var builder = Host.CreateApplicationBuilder(args);
builder.AddServiceDefaults();
builder.Services.AddDbContext<EduMgrContext>((sp, opt) =>
{
    var configuration = sp.GetRequiredService<IConfiguration>();
    opt.UseNpgsql(configuration.GetConnectionString("EduMgr"), b => b.ConfigureNpgsql())
        .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking)
        .EnableDetailedErrors();
});
builder.EnrichNpgsqlDbContext<EduMgrContext>();
builder.Services.AddEfCoreUnitOfWork<EduMgrContext>()
    .AddEfCoreRepository<EduMgrContext>();

builder.Services
    .AddQuartz()
    .AddQuartzHostedService(q => q.WaitForJobsToComplete = true);

builder.Services.Configure<ExpirationOption>(builder.Configuration.GetSection("Expiration"));

builder.Services.AddHostedService<ExpirationService>();

var host = builder.Build();
host.Run();
