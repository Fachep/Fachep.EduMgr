using Fachep.EduMgr.WebAPI.Account.Models;
using Fachep.EduMgr.WebAPI.Account.Services;
using Fachep.EduMgr.WebAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Fachep.EduMgr.WebAPI.Account.Controllers;

[Area("Account")]
[ApiController]
[Route("[area]/[controller]")]
[Authorize(Roles = "Admin")]
public class UsersController(IUserService userService) : ControllerBase
{
    [HttpGet("[action]")]
    public async Task<ActionResult<int>> Count([AsParameters] [FromQuery] UserQuery? query = null)
    {
        return Ok(await userService.CountAsync(query?.ToDictionary(), HttpContext.RequestAborted));
    }

    [HttpGet]
    public async Task<ActionResult<List<UserDto>>> Page(
        [AsParameters] [FromQuery] PaginationRequest request,
        [AsParameters] [FromQuery] UserQuery? query = null)
    {
        return Ok(await userService.PageAsync(request.Limit, request.Offset, request.OrderBy,
            query?.ToDictionary(),
            HttpContext.RequestAborted));
    }

    [HttpGet("{id:long}")]
    public async Task<ActionResult<UserDto>> Detail(long id)
    {
        var user = await userService.GetAsync(id, HttpContext.RequestAborted);
        if (user is null) return NotFound();

        return Ok(user);
    }

    [HttpGet("[action]")]
    public async Task<ActionResult<List<UserDto>>> Range([FromQuery] long[] ids)
    {
        return Ok(await userService.GetRangeAsync(ids, HttpContext.RequestAborted));
    }

    [HttpDelete("{id:long}")]
    public async Task<ActionResult> Delete(long id)
    {
        await userService.DeleteAsync(id, HttpContext.RequestAborted);
        return NoContent();
    }

    [HttpPut("{id:long}")]
    public async Task<ActionResult> Update(long id, UserDto userDto)
    {
        if (id != userDto.Id) return BadRequest();
        await userService.UpdateAsync(userDto, HttpContext.RequestAborted);
        return NoContent();
    }

    [HttpPost]
    public async Task<ActionResult> Create(UserDto userDto)
    {
        var id = await userService.CreateAndGetKeyAsync(userDto, HttpContext.RequestAborted);
        return CreatedAtAction(nameof(Detail), new { id }, new { id });
    }
}
