using Fachep.EduMgr.Database;
using Fachep.EduMgr.Entities;
using Fachep.EduMgr.WebHost.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Fachep.EduMgr.WebHost.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class SetupController : ControllerBase
{
    //[HttpPost]
    // public async Task<ActionResult<ResetPasswordResponse>> SetupAdmin(UserManager<User> userManager)
    // {
    //     var admin = await userManager.FindByNameAsync("ADMIN");
    //     if (admin is null) return NotFound();
    //
    //     if (!string.IsNullOrWhiteSpace(admin.PasswordHash)) return Conflict();
    //     string? password = null;
    //     for (var i = 0; i < 10; i++)
    //     {
    //         var pwd = Convert.ToBase64String(RandomNumberGenerator.GetBytes(16));
    //         admin.PasswordHash = null;
    //         if ((await userManager.AddPasswordAsync(admin, pwd)).Succeeded)
    //         {
    //             password = pwd;
    //             break;
    //         }
    //     }
    //
    //     if (password is null)
    //     {
    //         return StatusCode(500, "Failed to set password for admin user.");
    //     }
    //     return Ok(new ResetPasswordResponse { Password = password });
    // }

    [HttpPost]
    public async Task<ActionResult> MigrateDatabase(EduMgrContext dbContext)
    {
        await dbContext.Database.MigrateAsync(HttpContext.RequestAborted);
        return NoContent();
    }

    [HttpPost]
    public async Task<ActionResult<string>> GenerateDemoData(EduMgrContext dbContext,
        IPasswordHasher<User> passwordHasher)
    {
        var demoDataGenerator = new DemoDataGenerator(dbContext, passwordHasher);
        var rows = await demoDataGenerator.GenerateDemoDataAsync(HttpContext.RequestAborted);
        return Ok($"{rows} rows generated");
    }
}
