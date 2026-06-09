using System.ComponentModel.DataAnnotations;

namespace Fachep.EduMgr.WebAPI.Account.Models;

public record LoginRequest
{
    [Required] public required long UserId { get; init; }

    [DataType(DataType.Password)]
    [Required]
    public required string Password { get; init; }

    [Required] public required Guid DeviceId { get; init; }
}
