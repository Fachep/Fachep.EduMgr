using AutoMapper;
using Fachep.EduMgr.WebAPI.Account.Models;
using Fachep.EduMgr.WebAPI.Account.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Fachep.EduMgr.WebAPI.Account.Controllers;

[Area("Account")]
[ApiController]
[Route("[area]/[controller]")]
[Authorize]
public class ProfileController(IUserService userService, IMapper mapper) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<UserDto>> Get()
    {
        var user = await userService.GetUser(HttpContext.User, HttpContext.RequestAborted);
        if (user is null) return Unauthorized();

        return Ok(user);
    }

    [HttpPut]
    public async Task<ActionResult> Update(UserProfile userProfile)
    {
        var userDto = await userService.GetUser(HttpContext.User, HttpContext.RequestAborted);
        if (userDto is null) return Unauthorized();
        mapper.Map(userProfile, userDto);
        await userService.UpdateAsync(userDto, HttpContext.RequestAborted);
        return NoContent();
    }
}
