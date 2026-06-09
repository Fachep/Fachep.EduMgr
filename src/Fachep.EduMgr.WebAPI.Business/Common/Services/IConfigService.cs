using Fachep.EduMgr.WebAPI.Common.Models;

namespace Fachep.EduMgr.WebAPI.Common.Services;

public interface IConfigService
{
    Task<ConfigDto> GetConfigAsync(CancellationToken token = default);
    Task UpdateConfigAsync(ConfigDto configDto, CancellationToken token = default);
}
