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
public class StudentsController(IStudentService studentService) : ControllerBase
{
    [HttpGet("[action]")]
    public async Task<ActionResult<int>> Count(
        [AsParameters] [FromQuery] StudentQuery? query = null)
    {
        return await studentService.CountAsync(query?.ToDictionary(), HttpContext.RequestAborted);
    }

    [HttpGet]
    public async Task<ActionResult<List<StudentDto>>> Page(
        [AsParameters] [FromQuery] PaginationRequest request,
        [AsParameters] [FromQuery] StudentQuery? query = null)
    {
        return Ok(await studentService.PageAsync(request.Limit, request.Offset, request.OrderBy,
            query?.ToDictionary(), HttpContext.RequestAborted));
    }

    [HttpGet("{id:long}")]
    public async Task<ActionResult<StudentDto>> Detail(long id)
    {
        var student = await studentService.GetAsync(id, HttpContext.RequestAborted);
        if (student is null) return NotFound();
        return Ok(student);
    }

    [HttpGet("[action]")]
    public async Task<ActionResult<List<StudentDto>>> Range([FromQuery] long[] ids)
    {
        return Ok(await studentService.GetRangeAsync(ids, HttpContext.RequestAborted));
    }

    [HttpPut("{id:long}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> Update(long id, StudentDto studentDto)
    {
        if (id != studentDto.Id) return BadRequest();
        await studentService.UpdateAsync(studentDto, HttpContext.RequestAborted);
        return NoContent();
    }
}
