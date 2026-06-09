using System.ComponentModel.DataAnnotations;
using AutoMapper;
using AutoMapper.Configuration.Annotations;
using Fachep.EduMgr.Entities;

namespace Fachep.EduMgr.WebAPI.Education.Models;

[AutoMap(typeof(Schedule), ReverseMap = true)]
public record ScheduleDto
{
    public Guid Id { get; init; }

    [Required]
    [SourceMember(nameof(Schedule.OwnerId))]
    public long CourseId { get; init; }

    public string? Location { get; init; }

    [Required]
    //[Range(0, 44)]
    public required int[][] Weeks { get; init; }

    [Required]
    //[Range(0, 7)]
    public required int[][] Days { get; init; }

    [Required]
    //[Range(0, 12)]
    public required int[][] Sections { get; init; }
}
