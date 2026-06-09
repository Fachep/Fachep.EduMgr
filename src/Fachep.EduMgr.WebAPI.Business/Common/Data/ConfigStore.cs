using Fachep.EduMgr.Entities;
using Microsoft.EntityFrameworkCore;

namespace Fachep.EduMgr.WebAPI.Common.Data;

public class ConfigStore<TContext>(TContext context) : IConfigStore where TContext : DbContext
{
    public async Task<Config> GetConfigAsync(CancellationToken token = default)
    {
        token.ThrowIfCancellationRequested();
        return await context.Set<Config>().FirstAsync(token);
    }

    public async Task UpdateConfigAsync(Config config, CancellationToken token = default)
    {
        token.ThrowIfCancellationRequested();
        context.Update(config);
        await context.SaveChangesAsync(token);
    }
}
