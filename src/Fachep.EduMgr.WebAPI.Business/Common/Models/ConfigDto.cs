using System.ComponentModel.DataAnnotations;
using AutoMapper;
using Fachep.EduMgr.Entities;

namespace Fachep.EduMgr.WebAPI.Common.Models;

[AutoMap(typeof(Config), ReverseMap = true)]
public record ConfigDto
{
    [Required] public required DateOnly StartDate { get; init; }

    [Required] public required DayOfWeek StartDayOfWeek { get; init; }

    [Required] public required SectionInfo[] Sections { get; init; }
}
