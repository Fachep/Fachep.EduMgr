using System.Text.Json.Serialization;
using Fachep.EduMgr.Database;
using Fachep.EduMgr.Infrastructure.Data;
using Fachep.EduMgr.WebAPI;
using Fachep.EduMgr.WebHost.Extensions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();
var env = builder.Environment;

builder.Services.AddHttpLogging();

#region Database

builder.Services.AddDbContextPool<EduMgrContext>((sp, opt) =>
{
    var configuration = sp.GetRequiredService<IConfiguration>();
    opt.UseNpgsql(configuration.GetConnectionString("EduMgr"), b => b.ConfigureNpgsql())
        .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking)
        .EnableDetailedErrors();
});
builder.EnrichNpgsqlDbContext<EduMgrContext>();
builder.Services.AddEfCoreUnitOfWork<EduMgrContext>()
    .AddEfCoreRepository<EduMgrContext>();
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

#endregion // Database

#region Api

builder.Services
    .AddEndpointsApiExplorer()
    .AddSwaggerGen()
    .AddOpenApi();
builder.Services.AddCors(opt =>
{
    opt.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});
builder.Services
    .AddControllers(opt => { opt.UseRoutePrefix("api"); })
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
        options.JsonSerializerOptions.NumberHandling = JsonNumberHandling.AllowReadingFromString;
    })
    .AddBusinessApplicationPart();

#endregion // Api

#region Mapper

builder.Services
    .AddAutoMapper(cfg => { cfg.AddMapperProfiles(); });

#endregion

builder.Services
    .AddBusinessServices<EduMgrContext>();
builder.Services
    .AddCoreServices()
    .ConfigureExcludeControllers(builder.Configuration.GetSection("ExcludeControllers"))
    .ConfigureJwt(builder.Configuration.GetSection("Jwt"));

builder.Services
    .Configure<IdentityOptions>(opt =>
    {
        opt.Password = new PasswordOptions
        {
            RequireDigit = false,
            RequireLowercase = false,
            RequireNonAlphanumeric = false,
            RequireUppercase = false,
            RequiredLength = 6,
            RequiredUniqueChars = 1
        };
    });

var app = builder.Build();

#region Middleware

if (env.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseMigrationsEndPoint();
    app.UseSwagger(opt => opt.OpenApiVersion = OpenApiSpecVersion.OpenApi3_1);
    app.UseSwaggerUI();
}

app.UseHttpLogging();
app.UseRouting();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();

#endregion // Middleware

#region Route

app.MapControllers();
app.MapDefaultEndpoints();
if (env.IsDevelopment())
{
    app.MapOpenApi();
    app.MapSwagger();
}

#endregion // Route

_ = Task.Run(async () =>
{
    await using var scope = app.Services.CreateAsyncScope();
    await scope.ServiceProvider.GetRequiredService<EduMgrContext>()
        .Database.ExecuteSqlRawAsync("SELECT 1");
});

app.Run();
