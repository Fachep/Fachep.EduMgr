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
public class MajorsController(IMajorService majorService) : ControllerBase
{
    [HttpGet("[action]")]
    public async Task<ActionResult<int>> Count([AsParameters] [FromQuery] MajorQuery? query = null)
    {
        return await majorService.CountAsync(query?.ToDictionary(), HttpContext.RequestAborted);
    }

    [HttpGet]
    public async Task<ActionResult<List<MajorDto>>> Page(
        [AsParameters] [FromQuery] PaginationRequest request,
        [AsParameters] [FromQuery] MajorQuery? query = null)
    {
        return Ok(await majorService.PageAsync(request.Limit, request.Offset, request.OrderBy,
            query?.ToDictionary(), HttpContext.RequestAborted));
    }

    [HttpGet("{id:long}")]
    public async Task<ActionResult<MajorDto>> Detail(long id)
    {
        var major = await majorService.GetAsync(id, HttpContext.RequestAborted);
        if (major is null) return NotFound();
        return Ok(major);
    }

    [HttpGet("[action]")]
    public async Task<ActionResult<List<MajorDto>>> Range([FromQuery] long[] ids)
    {
        return Ok(await majorService.GetRangeAsync(ids, HttpContext.RequestAborted));
    }

    [HttpPut("{id:long}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> Update(long id, MajorDto majorDto)
    {
        if (id != majorDto.Id) return BadRequest();
        await majorService.UpdateAsync(majorDto, HttpContext.RequestAborted);
        return NoContent();
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> Create(MajorDto majorDto)
    {
        var id = await majorService.CreateAndGetKeyAsync(majorDto with { Id = 0 },
            HttpContext.RequestAborted);
        return CreatedAtAction(nameof(Detail), new { id }, null);
    }

    [HttpDelete("{id:long}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> Delete(long id)
    {
        await majorService.DeleteAsync(id, HttpContext.RequestAborted);
        return NoContent();
    }
}
