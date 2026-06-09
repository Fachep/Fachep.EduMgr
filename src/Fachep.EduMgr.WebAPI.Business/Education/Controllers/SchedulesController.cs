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
public class SchedulesController(
    IScheduleService scheduleService,
    IUserService userService,
    ICourseService courseService) : ControllerBase
{
    [HttpGet("[action]")]
    public async Task<ActionResult<int>> Count(
        [AsParameters] [FromQuery] ScheduleQuery? query = null)
    {
        return await scheduleService.CountAsync(query?.ToDictionary(), HttpContext.RequestAborted);
    }

    [HttpGet]
    public async Task<ActionResult<List<ScheduleDto>>> Page(
        [AsParameters] [FromQuery] PaginationRequest request,
        [AsParameters] [FromQuery] ScheduleQuery? query = null)
    {
        return Ok(await scheduleService.PageAsync(request.Limit, request.Offset, request.OrderBy,
            query?.ToDictionary(), HttpContext.RequestAborted));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ScheduleDto>> Detail(Guid id)
    {
        var schedule = await scheduleService.GetAsync(id, HttpContext.RequestAborted);
        if (schedule is null) return NotFound();
        return Ok(schedule);
    }

    [HttpGet("[action]")]
    public async Task<ActionResult<List<ScheduleDto>>> Range([FromQuery] Guid[] ids)
    {
        return Ok(await scheduleService.GetRangeAsync(ids, HttpContext.RequestAborted));
    }

    [HttpPut("{id:guid}")]
    [Authorize(Roles = "Admin,Teacher")]
    public async Task<ActionResult> Update(Guid id, ScheduleDto scheduleDto)
    {
        if (id != scheduleDto.Id) return BadRequest();

        if (await IsOwnerOrAdmin(scheduleDto.CourseId) is { } result) return result;
        await scheduleService.UpdateAsync(scheduleDto, HttpContext.RequestAborted);
        return NoContent();
    }

    [HttpPost]
    [Authorize(Roles = "Admin,Teacher")]
    public async Task<ActionResult> Create(ScheduleDto scheduleDto)
    {
        if (await IsOwnerOrAdmin(scheduleDto.CourseId) is { } result) return result;
        var id = await scheduleService.CreateAndGetKeyAsync(scheduleDto,
            HttpContext.RequestAborted);
        return CreatedAtAction(nameof(Detail), new { id }, null);
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Roles = "Admin,Teacher")]
    public async Task<ActionResult> Delete(Guid id)
    {
        var schedule = await scheduleService.GetAsync(id, HttpContext.RequestAborted);
        if (schedule is null) return NotFound();
        if (await IsOwnerOrAdmin(schedule.CourseId) is { } result) return result;
        await scheduleService.DeleteAsync(id, HttpContext.RequestAborted);
        return NoContent();
    }

    private async Task<ActionResult?> IsOwnerOrAdmin(long courseId)
    {
        var isAdmin = HttpContext.User.IsInRole("Admin");
        if (isAdmin) return null;
        var user = await userService.GetUser(HttpContext.User, HttpContext.RequestAborted);
        if (user is null) return Unauthorized();
        var course = await courseService.GetAsync(courseId, HttpContext.RequestAborted);
        if (course is null) return NotFound();
        if (course.TeacherId != user.Id) return Forbid();
        return null;
    }
}
