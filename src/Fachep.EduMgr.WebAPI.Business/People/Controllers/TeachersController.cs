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
public class TeachersController(ITeacherService teacherService) : ControllerBase
{
    [HttpGet("[action]")]
    public async Task<ActionResult<int>> Count(
        [AsParameters] [FromQuery] TeacherQuery? query = null)
    {
        return await teacherService.CountAsync(query?.ToDictionary(), HttpContext.RequestAborted);
    }

    [HttpGet]
    public async Task<ActionResult<List<TeacherDto>>> Page(
        [AsParameters] [FromQuery] PaginationRequest request,
        [AsParameters] [FromQuery] TeacherQuery? query = null)
    {
        return Ok(await teacherService.PageAsync(request.Limit, request.Offset, request.OrderBy,
            query?.ToDictionary(), HttpContext.RequestAborted));
    }

    [HttpGet("{id:long}")]
    public async Task<ActionResult<TeacherDto>> Detail(long id)
    {
        var teacher = await teacherService.GetAsync(id, HttpContext.RequestAborted);
        if (teacher is null) return NotFound();
        return Ok(teacher);
    }

    [HttpGet("[action]")]
    public async Task<ActionResult<List<TeacherDto>>> Range([FromQuery] long[] ids)
    {
        return Ok(await teacherService.GetRangeAsync(ids, HttpContext.RequestAborted));
    }

    [HttpPut("{id:long}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> Update(long id, TeacherDto teacherDto)
    {
        if (id != teacherDto.Id) return BadRequest();
        await teacherService.UpdateAsync(teacherDto, HttpContext.RequestAborted);
        return NoContent();
    }
}
