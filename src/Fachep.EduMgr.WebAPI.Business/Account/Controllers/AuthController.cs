using Fachep.EduMgr.WebAPI.Account.Models;
using Fachep.EduMgr.WebAPI.Account.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Fachep.EduMgr.WebAPI.Account.Controllers;

[Area("Account")]
[ApiController]
[Route("[area]/[controller]/[action]")]
[Authorize]
public class AuthController(IAuthService authService, IUserService userService) : ControllerBase
{
    [HttpPost]
    [AllowAnonymous]
    public async Task<ActionResult<LoginResult>> Login(LoginRequest request)
    {
        var result = await authService.LoginAsync(request.UserId, request.DeviceId,
            request.Password,
            HttpContext.RequestAborted);
        return result is null ? Unauthorized() : Ok(result);
    }

    [HttpPost]
    [Authorize(AuthenticationSchemes = "Refresh")]
    public async Task<ActionResult<LoginResult>> Refresh([FromQuery] Guid deviceId)
    {
        var result =
            await authService.RefreshAsync(HttpContext.User, deviceId, HttpContext.RequestAborted);
        return result is null ? Unauthorized() : Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult> ChangePassword(ChangePasswordRequest request)
    {
        var user = await userService.GetUser(HttpContext.User, HttpContext.RequestAborted);
        if (user is null) return Unauthorized();

        await authService.ChangePasswordAsync(user.Id, request.OldPassword, request.NewPassword,
            HttpContext.RequestAborted);
        return NoContent();
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<ResetPasswordResponse>> ForceResetPassword(
        [FromQuery] long userId)
    {
        var password = await authService.ResetPasswordAsync(userId, HttpContext.RequestAborted);
        if (password is null) return StatusCode(500);
        return Ok(new ResetPasswordResponse { Password = password });
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult> Logout([FromQuery] Guid deviceId)
    {
        var user = await userService.GetUser(HttpContext.User, HttpContext.RequestAborted);
        if (user is null) return Unauthorized();

        await authService.LogoutAsync(user.Id, deviceId, HttpContext.RequestAborted);
        return NoContent();
    }
}
