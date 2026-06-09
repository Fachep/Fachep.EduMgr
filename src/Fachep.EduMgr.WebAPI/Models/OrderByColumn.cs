using System.ComponentModel.DataAnnotations;

namespace Fachep.EduMgr.WebAPI.Models;

public record OrderByColumn
{
    [Required] public required string ColumnName { get; init; }

    public bool Ascending { get; init; } = true;
}
