using System.ComponentModel.DataAnnotations;

namespace Fachep.EduMgr.WebAPI.Account.Models;

public record ChangePasswordRequest
{
    [DataType(DataType.Password)]
    [Required]
    public required string OldPassword { get; init; }

    [DataType(DataType.Password)]
    [Required]
    public required string NewPassword { get; init; }
}
