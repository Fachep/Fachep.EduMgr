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
public class DepartmentsController(IDepartmentService departmentService) : ControllerBase
{
    [HttpGet("[action]")]
    public async Task<ActionResult<int>> Count(
        [AsParameters] [FromQuery] DepartmentQuery? query = null)
    {
        return await departmentService.CountAsync(query?.ToDictionary(),
            HttpContext.RequestAborted);
    }

    [HttpGet]
    public async Task<ActionResult<List<DepartmentDto>>> Page(
        [AsParameters] [FromQuery] PaginationRequest request,
        [AsParameters] [FromQuery] DepartmentQuery? query = null)
    {
        return Ok(await departmentService.PageAsync(request.Limit, request.Offset, request.OrderBy,
            query?.ToDictionary(), HttpContext.RequestAborted));
    }

    [HttpGet("{id:long}")]
    public async Task<ActionResult<DepartmentDto>> Detail(long id)
    {
        var department = await departmentService.GetAsync(id, HttpContext.RequestAborted);
        if (department is null) return NotFound();
        return Ok(department);
    }

    [HttpGet("[action]")]
    public async Task<ActionResult<List<DepartmentDto>>> Range([FromQuery] long[] ids)
    {
        return Ok(await departmentService.GetRangeAsync(ids, HttpContext.RequestAborted));
    }

    [HttpPut("{id:long}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> Update(long id, DepartmentDto departmentDto)
    {
        if (id != departmentDto.Id) return BadRequest();
        await departmentService.UpdateAsync(departmentDto, HttpContext.RequestAborted);
        return NoContent();
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> Create(DepartmentDto departmentDto)
    {
        var id = await departmentService.CreateAndGetKeyAsync(departmentDto with { Id = 0 },
            HttpContext.RequestAborted);
        return CreatedAtAction(nameof(Detail), new { id }, null);
    }

    [HttpDelete("{id:long}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> Delete(long id)
    {
        await departmentService.DeleteAsync(id, HttpContext.RequestAborted);
        return NoContent();
    }
}
