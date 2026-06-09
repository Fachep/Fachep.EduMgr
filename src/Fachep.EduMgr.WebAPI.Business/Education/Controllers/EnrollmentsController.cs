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
public class EnrollmentsController(
    IEnrollmentService enrollmentService,
    IUserService userService,
    ICourseService courseService) : ControllerBase
{
    [HttpGet("[action]")]
    public async Task<ActionResult<int>> Count(
        [AsParameters] [FromQuery] EnrollmentQuery? query = null)
    {
        return await enrollmentService.CountAsync(query?.ToDictionary(),
            HttpContext.RequestAborted);
    }

    [HttpGet]
    public async Task<ActionResult<List<EnrollmentDto>>> Page(
        [AsParameters] [FromQuery] PaginationRequest request,
        [AsParameters] [FromQuery] EnrollmentQuery? query = null)
    {
        return Ok(await enrollmentService.PageAsync(request.Limit, request.Offset, request.OrderBy,
            query?.ToDictionary(), HttpContext.RequestAborted));
    }

    [HttpGet("{studentId:long}/{courseId:long}")]
    public async Task<ActionResult<EnrollmentDto>> Detail(long studentId, long courseId)
    {
        var enrollment =
            await enrollmentService.GetAsync(studentId, courseId, HttpContext.RequestAborted);
        if (enrollment is null) return NotFound();
        return Ok(enrollment);
    }

    [HttpPost("{studentId:long}/{courseId:long}")]
    [Authorize(Roles = "Admin,Student")]
    public async Task<ActionResult> Create(long studentId, long courseId)
    {
        var user = await userService.GetUser(HttpContext.User);
        if (user is null) return Unauthorized();
        if (user.UserRole != UserRole.Admin && user.Id != studentId) return Forbid();
        var course = await courseService.GetAsync(courseId, HttpContext.RequestAborted);
        if (course is null) return NotFound();
        if (course.Locked) return Forbid();
        await enrollmentService.CreateAsync(
            new EnrollmentDto { StudentId = studentId, CourseId = courseId, Locked = false },
            HttpContext.RequestAborted);
        return CreatedAtAction(nameof(Detail), new { studentId, courseId }, null);
    }

    [HttpDelete("{studentId:long}/{courseId:long}")]
    [Authorize(Roles = "Admin,Student")]
    public async Task<ActionResult> Delete(long studentId, long courseId)
    {
        var user = await userService.GetUser(HttpContext.User);
        if (user is null) return Unauthorized();
        if (user.UserRole != UserRole.Admin && user.Id != studentId) return Forbid();

        var enrollment =
            await enrollmentService.GetAsync(studentId, courseId, HttpContext.RequestAborted);
        if (enrollment is null) return NotFound();

        if (user.UserRole != UserRole.Admin && enrollment.Locked) return Forbid();
        await enrollmentService.DeleteAsync(enrollment, HttpContext.RequestAborted);
        return NoContent();
    }
}
