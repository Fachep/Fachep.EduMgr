using System.ComponentModel.DataAnnotations;
using AutoMapper;
using AutoMapper.Configuration.Annotations;
using Fachep.EduMgr.Entities;

namespace Fachep.EduMgr.WebAPI.People.Models;

[AutoMap(typeof(Major), ReverseMap = true)]
public record MajorDto
{
    [Required] public required long Id { get; init; }

    [Required] public required string Name { get; init; }

    [SourceMember(nameof(Major.OwnerId))] public long? DepartmentId { get; init; }
}
