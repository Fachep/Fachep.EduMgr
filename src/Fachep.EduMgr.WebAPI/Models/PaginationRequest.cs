using System.ComponentModel.DataAnnotations;

namespace Fachep.EduMgr.WebAPI.Models;

public record PaginationRequest
{
    [Range(1, 1000)] public int Limit { get; init; } = 50;

    [Range(0, int.MaxValue)] public int Offset { get; init; } = 0;

    public OrderByColumn[]? OrderBy { get; init; } = [];
}
