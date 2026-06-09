using System.ComponentModel.DataAnnotations;
using AutoMapper;
using Fachep.EduMgr.Entities;

namespace Fachep.EduMgr.WebAPI.People.Models;

[AutoMap(typeof(Student), ReverseMap = true)]
public record StudentDto
{
    [Required] public required long Id { get; init; }

    public string? Name { get; init; }
    public long? ClassId { get; init; }
}
