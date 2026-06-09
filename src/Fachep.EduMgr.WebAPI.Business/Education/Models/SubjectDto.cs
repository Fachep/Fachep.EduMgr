using System.ComponentModel.DataAnnotations;
using AutoMapper;
using AutoMapper.Configuration.Annotations;
using Fachep.EduMgr.Entities;

namespace Fachep.EduMgr.WebAPI.Education.Models;

[AutoMap(typeof(Subject), ReverseMap = true)]
public record SubjectDto
{
    [Required] public required long Id { get; init; }

    [Required] public required string Name { get; init; }

    [SourceMember(nameof(Subject.OwnerId))]
    public long? DepartmentId { get; init; }
}
