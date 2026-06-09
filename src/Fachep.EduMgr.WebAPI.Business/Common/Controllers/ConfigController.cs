using Fachep.EduMgr.WebAPI.Common.Models;
using Fachep.EduMgr.WebAPI.Common.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Fachep.EduMgr.WebAPI.Common.Controllers;

[ApiController]
[Route("[controller]")]
public class ConfigController(IConfigService configService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<ConfigDto>> GetConfig()
    {
        var config = await configService.GetConfigAsync(HttpContext.RequestAborted);
        return Ok(config);
    }

    [HttpPut]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> UpdateConfig(ConfigDto configDto)
    {
        await configService.UpdateConfigAsync(configDto, HttpContext.RequestAborted);
        return NoContent();
    }
}
