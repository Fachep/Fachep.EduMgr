using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using Fachep.EduMgr.Entities;
using Fachep.EduMgr.Infrastructure.Data;
using Fachep.EduMgr.WebAPI.Account.Data;
using Fachep.EduMgr.WebAPI.Account.Models;
using Fachep.EduMgr.WebAPI.Configurations;
using Fachep.EduMgr.WebAPI.Exceptions;
using Fachep.EduMgr.WebAPI.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using NodaTime;
using NodaTime.Extensions;

namespace Fachep.EduMgr.WebAPI.Account.Services;

public class AuthService<TContext>(
    SignInManager<User> signInManager,
    IRepositoryWithContext<TContext, User, long> userRepository,
    IJwtService jwtService,
    IRepositoryWithContext<TContext, UserToken> userTokenRepository,
    IOptions<JwtOptions> options,
    IUnitOfWork<TContext> unitOfWork) : IAuthService where TContext : DbContext
{
    public async Task<LoginResult?> LoginAsync(long id, Guid deviceId, string password,
        CancellationToken token = default)
    {
        token.ThrowIfCancellationRequested();
        var user = await userRepository.SelectFirstByIdAsync(id, token);
        if (user is null) return null;

        var passwordResult = await signInManager.CheckPasswordSignInAsync(user, password, false);
        if (!passwordResult.Succeeded) return null;

        return await GenerateTokens(user, deviceId, token);
    }

    public async Task RegisterAsync(long id, string password, CancellationToken token = default)
    {
        token.ThrowIfCancellationRequested();
        var user = new User(id);
        var result = await signInManager.UserManager.CreateAsync(user, password);
        if (!result.Succeeded) throw new InvalidOperationException($"Cannot create user: {result}");
    }

    public async Task ChangePasswordAsync(long id, string currentPassword, string newPassword,
        CancellationToken token = default)
    {
        token.ThrowIfCancellationRequested();
        var user = await userRepository.SelectFirstByIdAsync(id, token);
        if (user is null) throw new EntityNotFoundException(id);

        var result =
            await signInManager.UserManager.ChangePasswordAsync(user, currentPassword, newPassword);
        if (!result.Succeeded)
            throw new InvalidOperationException($"Cannot change password: {result}");
    }

    public async Task LogoutAsync(long id, Guid deviceId, CancellationToken token = default)
    {
        token.ThrowIfCancellationRequested();
        await userTokenRepository.RemoveTokenAsync(id, deviceId, token);
        await unitOfWork.SaveChangesAsync(token);
    }

    public async Task<LoginResult?> RefreshAsync(ClaimsPrincipal principal, Guid deviceId,
        CancellationToken token = default)
    {
        ArgumentNullException.ThrowIfNull(principal);
        token.ThrowIfCancellationRequested();

        var userIdClaim = principal.FindFirst(ClaimTypes.NameIdentifier);
        var jtiClaim = principal.FindFirst(JwtRegisteredClaimNames.Jti);
        var securityStampClaim = principal.FindFirst("securityStamp");
        if (userIdClaim is null || jtiClaim is null || securityStampClaim is null) return null;
        if (!long.TryParse(userIdClaim.Value, out var userId)) return null;
        if (!Guid.TryParse(jtiClaim.Value, out var value)) return null;
        var user = await userRepository.SelectFirstByIdAsync(userId, token);
        if (user is null) return null;
        if (user.SecurityStamp != securityStampClaim.Value) return null;
        if (!await userTokenRepository.VerifyTokenAsync(userId, deviceId, value, token))
            return null;
        return await GenerateTokens(user, deviceId, token);
    }

    public async Task<string?> ResetPasswordAsync(long id, CancellationToken token = default)
    {
        token.ThrowIfCancellationRequested();
        var user = await userRepository.SelectFirstByIdAsync(id, token);
        if (user is null) throw new EntityNotFoundException(id);

        string? password = null;
        for (var i = 0; i < 10; i++)
        {
            var pwd = Convert.ToBase64String(RandomNumberGenerator.GetBytes(16));
            user.PasswordHash = null;
            if ((await signInManager.UserManager.AddPasswordAsync(user, pwd)).Succeeded)
            {
                password = pwd;
                break;
            }
        }

        return password;
    }

    private async Task<LoginResult> GenerateTokens(User user, Guid deviceId,
        CancellationToken token = default)
    {
        ArgumentNullException.ThrowIfNull(user);
        token.ThrowIfCancellationRequested();

        var value = Guid.NewGuid();
        var refreshExpiration = SystemClock.Instance.GetCurrentInstant()
            .Plus(options.Value.RefreshToken.Expiration.ToDuration());
        await userTokenRepository.SetTokenAsync(user.Id, deviceId, value, refreshExpiration, token);
        await unitOfWork.SaveChangesAsync(token);

        var accessIdentity =
            new ClaimsIdentity((await signInManager.CreateUserPrincipalAsync(user)).Identity);
        accessIdentity.AddClaim(new Claim(ClaimTypes.Role, user.UserRole.ToString()));

        var refreshIdentity = new ClaimsIdentity([
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim("securityStamp", user.SecurityStamp ?? string.Empty),
            new Claim(JwtRegisteredClaimNames.Jti, value.ToString())
        ]);

        var accessToken = jwtService.GenerateAccessToken(accessIdentity);
        var refreshToken = jwtService.GenerateRefreshToken(refreshIdentity);
        return new LoginResult { AccessToken = accessToken, RefreshToken = refreshToken };
    }
}
