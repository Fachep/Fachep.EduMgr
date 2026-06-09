using Fachep.EduMgr.Entities;
using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL.Infrastructure;

namespace Fachep.EduMgr.Database;

public static class NpgsqlDbContextOptionsBuilderExtensions
{
    public static NpgsqlDbContextOptionsBuilder ConfigureNpgsql(
        this NpgsqlDbContextOptionsBuilder builder)
    {
        return builder
            .UseNodaTime()
            .MapEnum<UserRole>()
            .SetPostgresVersion(new Version(17, 0))
            .MigrationsAssembly(typeof(EduMgrContext).Assembly);
    }
}
