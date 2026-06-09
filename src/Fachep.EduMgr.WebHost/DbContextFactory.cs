using Fachep.EduMgr.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Fachep.EduMgr.WebHost;

public class DbContextFactory : IDesignTimeDbContextFactory<EduMgrContext>
{
    public EduMgrContext CreateDbContext(string[] args)
    {
        var builder = new DbContextOptionsBuilder<EduMgrContext>()
            .UseNpgsql(b => b.ConfigureNpgsql())
            .EnableDetailedErrors();

        return new EduMgrContext(builder.Options);
    }
}
