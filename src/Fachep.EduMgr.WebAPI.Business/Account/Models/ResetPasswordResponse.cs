using System.ComponentModel.DataAnnotations;

namespace Fachep.EduMgr.WebAPI.Account.Models;

public record ResetPasswordResponse
{
    [DataType(DataType.Password)]
    [Required]
    public required string Password { get; init; }
}
