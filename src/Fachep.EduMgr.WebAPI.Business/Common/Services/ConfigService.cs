using AutoMapper;
using Fachep.EduMgr.WebAPI.Common.Data;
using Fachep.EduMgr.WebAPI.Common.Models;

namespace Fachep.EduMgr.WebAPI.Common.Services;

public class ConfigService(IConfigStore configStore, IMapper mapper) : IConfigService
{
    public async Task<ConfigDto> GetConfigAsync(CancellationToken token = default)
    {
        token.ThrowIfCancellationRequested();
        return mapper.Map<ConfigDto>(await configStore.GetConfigAsync(token));
    }

    public async Task UpdateConfigAsync(ConfigDto configDto, CancellationToken token = default)
    {
        token.ThrowIfCancellationRequested();
        var config = await configStore.GetConfigAsync(token);
        mapper.Map(configDto, config);
        await configStore.UpdateConfigAsync(config, token);
    }
}
