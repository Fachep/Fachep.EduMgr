using Fachep.EduMgr.Entities;
using Microsoft.EntityFrameworkCore;

namespace Fachep.EduMgr.Database;

public class EduMgrContext(DbContextOptions<EduMgrContext> options) : DbContext(options)
{
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasPostgresEnum<UserRole>();
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(EduMgrContext).Assembly);
        base.OnModelCreating(modelBuilder);
    }
}
