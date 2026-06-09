using System.ComponentModel.DataAnnotations;
using AutoMapper;
using Fachep.EduMgr.Entities;

namespace Fachep.EduMgr.WebAPI.People.Models;

[AutoMap(typeof(Teacher), ReverseMap = true)]
public record TeacherDto
{
    [Required] public required long Id { get; init; }

    public string? Name { get; init; }
    public int? DepartmentId { get; init; }
}
