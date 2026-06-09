using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Fachep.EduMgr.WebAPI.Configurations;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Fachep.EduMgr.WebAPI.Services;

public class JwtService(
    IOptions<JwtOptions> options,
    IOptionsMonitor<JwtBearerOptions> bearerOptions) : IJwtService
{
    private readonly SigningCredentials _accessTokenCredentials =
        new(options.Value.AccessToken.SigningKey, options.Value.AccessToken.Algorithm);

    private readonly TokenValidationParameters _accessTokenValidationParameters =
        bearerOptions.Get(JwtBearerDefaults.AuthenticationScheme).TokenValidationParameters;

    private readonly SigningCredentials _refreshTokenCredentials =
        new(options.Value.RefreshToken.SigningKey, options.Value.RefreshToken.Algorithm);

    private readonly TokenValidationParameters _refreshTokenValidationParameters =
        bearerOptions.Get("Refresh").TokenValidationParameters;

    private readonly JwtSecurityTokenHandler _tokenHandler = new();

    public string GenerateAccessToken(ClaimsIdentity identity)
    {
        var descriptor = new SecurityTokenDescriptor
        {
            Subject = identity,
            Audience = options.Value.AccessToken.Audience,
            Issuer = options.Value.AccessToken.Issuer,
            IssuedAt = DateTime.UtcNow,
            NotBefore = DateTime.UtcNow,
            Expires = DateTime.UtcNow.Add(options.Value.AccessToken.Expiration),
            SigningCredentials = _accessTokenCredentials
        };
        return _tokenHandler.CreateEncodedJwt(descriptor);
    }

    public string GenerateRefreshToken(ClaimsIdentity identity)
    {
        var descriptor = new SecurityTokenDescriptor
        {
            Subject = identity,
            Audience = options.Value.RefreshToken.Audience,
            Issuer = options.Value.RefreshToken.Issuer,
            IssuedAt = DateTime.UtcNow,
            NotBefore = DateTime.UtcNow,
            Expires = DateTime.UtcNow.Add(options.Value.RefreshToken.Expiration),
            SigningCredentials = _refreshTokenCredentials
        };
        return _tokenHandler.CreateEncodedJwt(descriptor);
    }

    public ClaimsPrincipal? TryParseAccessToken(string token)
    {
        try
        {
            return _tokenHandler.ValidateToken(token, _accessTokenValidationParameters, out _);
        }
        catch
        {
            return null;
        }
    }

    public ClaimsPrincipal? TryParseRefreshToken(string token)
    {
        try
        {
            return _tokenHandler.ValidateToken(token, _refreshTokenValidationParameters, out _);
        }
        catch
        {
            return null;
        }
    }
}
