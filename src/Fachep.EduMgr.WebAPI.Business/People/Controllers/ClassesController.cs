using Fachep.EduMgr.Entities;
using Fachep.EduMgr.WebAPI.Account.Services;
using Fachep.EduMgr.WebAPI.Models;
using Fachep.EduMgr.WebAPI.People.Models;
using Fachep.EduMgr.WebAPI.People.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Fachep.EduMgr.WebAPI.People.Controllers;

[Area("People")]
[ApiController]
[Route("[area]/[controller]")]
[Authorize]
public class ClassesController(IClassService classService, IUserService userService)
    : ControllerBase
{
    [HttpGet("[action]")]
    public async Task<ActionResult<int>> Count([AsParameters] [FromQuery] ClassQuery? query = null)
    {
        return await classService.CountAsync(query?.ToDictionary(), HttpContext.RequestAborted);
    }

    [HttpGet]
    public async Task<ActionResult<List<ClassDto>>> Page(
        [AsParameters] [FromQuery] PaginationRequest request,
        [AsParameters] [FromQuery] ClassQuery? query = null)
    {
        return Ok(await classService.PageAsync(request.Limit, request.Offset, request.OrderBy,
            query?.ToDictionary(), HttpContext.RequestAborted));
    }

    [HttpGet("{id:long}")]
    public async Task<ActionResult<ClassDto>> Detail(long id)
    {
        var @class = await classService.GetAsync(id, HttpContext.RequestAborted);
        if (@class is null) return NotFound();
        return Ok(@class);
    }

    [HttpGet("[action]")]
    public async Task<ActionResult<List<ClassDto>>> Range([FromQuery] long[] ids)
    {
        return Ok(await classService.GetRangeAsync(ids, HttpContext.RequestAborted));
    }

    [HttpPut("{id:long}")]
    [Authorize(Roles = "Admin,Teacher")]
    public async Task<ActionResult> Update(long id, ClassDto classDto)
    {
        if (id != classDto.Id) return BadRequest();
        var @class = await classService.GetAsync(id, HttpContext.RequestAborted);
        var user = await userService.GetUser(HttpContext.User);
        if (@class is null) return NotFound();
        if (user is null) return Unauthorized();
        if (user.UserRole != UserRole.Admin && @class.OwnerId != user.Id) return Forbid();
        await classService.UpdateAsync(classDto, HttpContext.RequestAborted);
        return NoContent();
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> Create(ClassDto classDto)
    {
        var id = await classService.CreateAndGetKeyAsync(classDto, HttpContext.RequestAborted);
        return CreatedAtAction(nameof(Detail), new { id }, null);
    }

    [HttpDelete("{id:long}")]
    [Authorize(Roles = "Admin,Teacher")]
    public async Task<ActionResult> Delete(long id)
    {
        var @class = await classService.GetAsync(id, HttpContext.RequestAborted);
        var user = await userService.GetUser(HttpContext.User);
        if (@class is null) return NoContent();
        if (user is null) return Unauthorized();
        if (user.UserRole != UserRole.Admin && @class.OwnerId != user.Id) return Forbid();
        await classService.DeleteAsync(id, HttpContext.RequestAborted);
        return NoContent();
    }
}
