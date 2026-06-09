using System.ComponentModel.DataAnnotations;
using AutoMapper;
using AutoMapper.Configuration.Annotations;
using Fachep.EduMgr.Entities;

namespace Fachep.EduMgr.WebAPI.Education.Models;

[AutoMap(typeof(Enrollment), ReverseMap = true)]
public record EnrollmentDto
{
    [Required] public required bool Locked { get; init; }

    [Required]
    [SourceMember(nameof(Enrollment.OwnerId))]
    public required long StudentId { get; init; }

    [Required] public required long CourseId { get; init; }
}
