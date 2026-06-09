using System.ComponentModel.DataAnnotations;
using AutoMapper;
using Fachep.EduMgr.Entities;

namespace Fachep.EduMgr.WebAPI.People.Models;

[AutoMap(typeof(Class), ReverseMap = true)]
public record ClassDto
{
    [Required] public required long Id { get; init; }

    public string? Name { get; init; }
    public long? OwnerId { get; init; }
    public long? MajorId { get; init; }
}
