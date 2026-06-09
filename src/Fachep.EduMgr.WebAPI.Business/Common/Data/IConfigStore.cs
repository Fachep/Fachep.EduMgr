using Fachep.EduMgr.Entities;

namespace Fachep.EduMgr.WebAPI.Common.Data;

public interface IConfigStore
{
    Task<Config> GetConfigAsync(CancellationToken token = default);
    Task UpdateConfigAsync(Config config, CancellationToken token = default);
}
