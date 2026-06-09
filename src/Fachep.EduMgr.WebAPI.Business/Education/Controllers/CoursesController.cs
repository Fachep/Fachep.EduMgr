using Fachep.EduMgr.Entities;
using Fachep.EduMgr.WebAPI.Account.Services;
using Fachep.EduMgr.WebAPI.Education.Models;
using Fachep.EduMgr.WebAPI.Education.Services;
using Fachep.EduMgr.WebAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Fachep.EduMgr.WebAPI.Education.Controllers;

[Area("Education")]
[ApiController]
[Route("[area]/[controller]")]
[Authorize]
public class CoursesController(
    ICourseService courseService,
    IUserService userService,
    IEnrollmentService enrollmentService) : ControllerBase
{
    [HttpGet("[action]")]
    public async Task<ActionResult<int>> Count([AsParameters] [FromQuery] CourseQuery? query = null)
    {
        return await courseService.CountAsync(query?.ToDictionary(), HttpContext.RequestAborted);
    }

    [HttpGet]
    public async Task<ActionResult<List<CourseDto>>> Page(
        [AsParameters] [FromQuery] PaginationRequest request,
        [AsParameters] [FromQuery] CourseQuery? query = null)
    {
        return Ok(await courseService.PageAsync(request.Limit, request.Offset, request.OrderBy,
            query?.ToDictionary(), HttpContext.RequestAborted));
    }

    [HttpGet("{id:long}")]
    public async Task<ActionResult<CourseDto>> Detail(long id)
    {
        var course = await courseService.GetAsync(id, HttpContext.RequestAborted);
        if (course is null) return NotFound();
        return Ok(course);
    }

    [HttpGet("[action]")]
    public async Task<ActionResult<List<CourseDto>>> Range([FromQuery] long[] ids)
    {
        return Ok(await courseService.GetRangeAsync(ids, HttpContext.RequestAborted));
    }

    [HttpPut("{id:long}")]
    [Authorize(Roles = "Admin,Teacher")]
    public async Task<ActionResult> Update(long id, CourseDto courseDto)
    {
        if (id != courseDto.Id) return BadRequest();
        var course = await courseService.GetAsync(id, HttpContext.RequestAborted);
        var user = await userService.GetUser(HttpContext.User);
        if (course is null) return NotFound();
        if (user is null) return Unauthorized();
        if ((user.UserRole != UserRole.Admin && course.TeacherId != user.Id) || course.Locked)
            return Forbid();

        await courseService.UpdateAsync(courseDto, HttpContext.RequestAborted);
        return NoContent();
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> Create(CourseDto courseDto)
    {
        var id = await courseService.CreateAndGetKeyAsync(courseDto, HttpContext.RequestAborted);
        return CreatedAtAction(nameof(Detail), new { id }, null);
    }

    [HttpDelete("{id:long}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> Delete(long id)
    {
        var course = await courseService.GetAsync(id, HttpContext.RequestAborted);
        var user = await userService.GetUser(HttpContext.User);
        if (course is null) return NotFound();
        if (user is null) return Unauthorized();
        if (user.UserRole != UserRole.Admin && course.TeacherId != user.Id) return Forbid();
        await courseService.DeleteAsync(id, HttpContext.RequestAborted);
        return NoContent();
    }
}
