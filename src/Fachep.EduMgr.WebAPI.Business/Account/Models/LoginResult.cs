using System.ComponentModel.DataAnnotations;

namespace Fachep.EduMgr.WebAPI.Account.Models;

public record LoginResult
{
    [Required] public required string AccessToken { get; init; }

    [Required] public required string RefreshToken { get; init; }
}
