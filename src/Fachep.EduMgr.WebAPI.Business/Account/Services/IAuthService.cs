using System.Security.Claims;
using Fachep.EduMgr.WebAPI.Account.Models;

namespace Fachep.EduMgr.WebAPI.Account.Services;

public interface IAuthService
{
    Task<LoginResult?> LoginAsync(long personId, Guid deviceId, string password,
        CancellationToken token = default);

    Task RegisterAsync(long personId, string password, CancellationToken token = default);

    Task ChangePasswordAsync(long id, string currentPassword,
        string newPassword,
        CancellationToken token = default);

    Task LogoutAsync(long id, Guid deviceId, CancellationToken token = default);

    Task<LoginResult?> RefreshAsync(ClaimsPrincipal principal,
        Guid deviceId,
        CancellationToken token = default);

    Task<string?> ResetPasswordAsync(long id, CancellationToken token = default);
}
