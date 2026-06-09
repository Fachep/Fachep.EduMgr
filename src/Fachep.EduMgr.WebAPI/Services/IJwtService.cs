using System.Security.Claims;

namespace Fachep.EduMgr.WebAPI.Services;

public interface IJwtService
{
    string GenerateAccessToken(ClaimsIdentity identity);
    string GenerateRefreshToken(ClaimsIdentity identity);
    ClaimsPrincipal? TryParseAccessToken(string token);
    ClaimsPrincipal? TryParseRefreshToken(string token);
}
