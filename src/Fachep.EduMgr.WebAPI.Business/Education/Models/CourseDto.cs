using System.ComponentModel.DataAnnotations;
using AutoMapper;
using AutoMapper.Configuration.Annotations;
using Fachep.EduMgr.Entities;

namespace Fachep.EduMgr.WebAPI.Education.Models;

[AutoMap(typeof(Course), ReverseMap = true)]
public record CourseDto
{
    [Required] public required long Id { get; init; }

    [SourceMember(nameof(Course.OwnerId))] public long? TeacherId { get; init; }

    [Required] public required long SubjectId { get; init; }

    [Required] public required bool Locked { get; init; }
}
