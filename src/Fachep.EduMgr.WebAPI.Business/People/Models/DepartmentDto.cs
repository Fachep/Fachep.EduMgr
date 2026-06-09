using System.ComponentModel.DataAnnotations;
using AutoMapper;
using Fachep.EduMgr.Entities;

namespace Fachep.EduMgr.WebAPI.People.Models;

[AutoMap(typeof(Department), ReverseMap = true)]
public record DepartmentDto
{
    [Required] public required long Id { get; init; }

    [Required] public required string Name { get; init; }
}
