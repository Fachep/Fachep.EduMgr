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
public class SubjectsController(ISubjectService subjectService) : ControllerBase
{
    [HttpGet("[action]")]
    public async Task<ActionResult<int>> Count(
        [AsParameters] [FromQuery] SubjectQuery? query = null)
    {
        return await subjectService.CountAsync(query?.ToDictionary(), HttpContext.RequestAborted);
    }

    [HttpGet]
    public async Task<ActionResult<List<SubjectDto>>> Page(
        [AsParameters] [FromQuery] PaginationRequest request,
        [AsParameters] [FromQuery] SubjectQuery? query = null)
    {
        return Ok(await subjectService.PageAsync(request.Limit, request.Offset, request.OrderBy,
            query?.ToDictionary(), HttpContext.RequestAborted));
    }

    [HttpGet("{id:long}")]
    public async Task<ActionResult<SubjectDto>> Detail(long id)
    {
        var subject = await subjectService.GetAsync(id, HttpContext.RequestAborted);
        if (subject is null) return NotFound();
        return Ok(subject);
    }

    [HttpGet("[action]")]
    public async Task<ActionResult<List<SubjectDto>>> Range([FromQuery] long[] ids)
    {
        return Ok(await subjectService.GetRangeAsync(ids, HttpContext.RequestAborted));
    }

    [HttpPut("{id:long}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> Update(long id, SubjectDto subjectDto)
    {
        if (id != subjectDto.Id) return BadRequest();
        await subjectService.UpdateAsync(subjectDto, HttpContext.RequestAborted);
        return NoContent();
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> Create(SubjectDto subjectDto)
    {
        var id = await subjectService.CreateAndGetKeyAsync(subjectDto, HttpContext.RequestAborted);
        return CreatedAtAction(nameof(Detail), new { id }, null);
    }

    [HttpDelete("{id:long}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> Delete(long id)
    {
        await subjectService.DeleteAsync(id, HttpContext.RequestAborted);
        return NoContent();
    }
}
