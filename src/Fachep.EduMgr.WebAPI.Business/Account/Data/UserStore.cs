using Fachep.EduMgr.Entities;
using Fachep.EduMgr.Infrastructure.Common;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Fachep.EduMgr.WebAPI.Account.Data;

public class UserStore<TContext>(TContext dbContext) :
    IUserRoleStore<User>,
    IUserPasswordStore<User>,
    IUserSecurityStampStore<User>,
    IUserEmailStore<User>,
    IUserPhoneNumberStore<User>
    where TContext : DbContext
{
    private bool _disposed;

    public Task SetEmailAsync(User user, string? email, CancellationToken token = default)
    {
        return TaskUtils.Try(() =>
        {
            ThrowIfDisposed();
            ArgumentNullException.ThrowIfNull(user);
            user.Email = email;
        }, token);
    }

    public Task<string?> GetEmailAsync(User user, CancellationToken token = default)
    {
        return TaskUtils.Try(() =>
        {
            ThrowIfDisposed();
            ArgumentNullException.ThrowIfNull(user);
            return user.Email;
        }, token);
    }

    public async Task<bool> GetEmailConfirmedAsync(User user, CancellationToken token = default)
    {
        return true;
    }

    public async Task SetEmailConfirmedAsync(User user, bool confirmed,
        CancellationToken token = default)
    {
    }

    public async Task<User?> FindByEmailAsync(string normalizedEmail,
        CancellationToken token = default)
    {
        ThrowIfDisposed();
        token.ThrowIfCancellationRequested();
        if (string.IsNullOrWhiteSpace(normalizedEmail)) return null;
        return await dbContext.Set<User>()
            .FirstOrDefaultAsync(u => u.NormalizedName == normalizedEmail, token);
    }

    public Task<string?> GetNormalizedEmailAsync(User user, CancellationToken token = default)
    {
        return TaskUtils.Try(() =>
        {
            ThrowIfDisposed();
            ArgumentNullException.ThrowIfNull(user);
            return user.NormalizedEmail;
        }, token);
    }

    public Task SetNormalizedEmailAsync(User user, string? normalizedEmail,
        CancellationToken token = default)
    {
        return TaskUtils.Try(() =>
        {
            ThrowIfDisposed();
            ArgumentNullException.ThrowIfNull(user);
            user.NormalizedEmail = normalizedEmail;
        }, token);
    }

    public Task SetPasswordHashAsync(User user, string? passwordHash,
        CancellationToken token = default)
    {
        return TaskUtils.Try(() =>
        {
            ThrowIfDisposed();
            ArgumentNullException.ThrowIfNull(user);
            user.PasswordHash = passwordHash;
        }, token);
    }

    public Task<string?> GetPasswordHashAsync(User user, CancellationToken token = default)
    {
        return TaskUtils.Try(() =>
        {
            ThrowIfDisposed();
            ArgumentNullException.ThrowIfNull(user);
            return user.PasswordHash;
        }, token);
    }

    public Task<bool> HasPasswordAsync(User user, CancellationToken token = default)
    {
        return TaskUtils.Try(() =>
        {
            ThrowIfDisposed();
            ArgumentNullException.ThrowIfNull(user);
            return !string.IsNullOrWhiteSpace(user.PasswordHash);
        }, token);
    }

    public Task SetPhoneNumberAsync(User user, string? phoneNumber,
        CancellationToken token = default)
    {
        return TaskUtils.Try(() =>
        {
            ThrowIfDisposed();
            ArgumentNullException.ThrowIfNull(user);
            user.PhoneNumber = phoneNumber;
        }, token);
    }

    public Task<string?> GetPhoneNumberAsync(User user, CancellationToken token = default)
    {
        return TaskUtils.Try(() =>
        {
            ThrowIfDisposed();
            ArgumentNullException.ThrowIfNull(user);
            return user.PhoneNumber;
        }, token);
    }

    public async Task<bool> GetPhoneNumberConfirmedAsync(User user,
        CancellationToken token = default)
    {
        return true;
    }

    public async Task SetPhoneNumberConfirmedAsync(User user, bool confirmed,
        CancellationToken token = default)
    {
    }

    public void Dispose()
    {
        _disposed = true;
        GC.SuppressFinalize(this);
    }


    public Task<string> GetUserIdAsync(User user, CancellationToken token = default)
    {
        return TaskUtils.Try(() =>
        {
            ThrowIfDisposed();
            ArgumentNullException.ThrowIfNull(user);
            return user.Id.ToString();
        }, token);
    }

    public Task<string?> GetUserNameAsync(User user, CancellationToken token = default)
    {
        return TaskUtils.Try(() =>
        {
            ThrowIfDisposed();
            ArgumentNullException.ThrowIfNull(user);
            return user.Name;
        }, token);
    }

    public Task SetUserNameAsync(User user, string? userName, CancellationToken token = default)
    {
        return TaskUtils.Try(() =>
        {
            ThrowIfDisposed();
            ArgumentNullException.ThrowIfNull(user);
            user.Name = userName;
        }, token);
    }

    public Task<string?> GetNormalizedUserNameAsync(User user, CancellationToken token = default)
    {
        return TaskUtils.Try(() =>
        {
            ThrowIfDisposed();
            ArgumentNullException.ThrowIfNull(user);
            return user.NormalizedName;
        }, token);
    }

    public Task SetNormalizedUserNameAsync(User user, string? normalizedName,
        CancellationToken token = default)
    {
        return TaskUtils.Try(() =>
        {
            ThrowIfDisposed();
            ArgumentNullException.ThrowIfNull(user);
            user.NormalizedName = normalizedName;
        }, token);
    }

    public async Task<IdentityResult> CreateAsync(User user, CancellationToken token = default)
    {
        ThrowIfDisposed();
        ArgumentNullException.ThrowIfNull(user);
        token.ThrowIfCancellationRequested();
        await dbContext.AddAsync(user, token);
        await dbContext.SaveChangesAsync(token);
        return IdentityResult.Success;
    }

    public async Task<IdentityResult> UpdateAsync(User user, CancellationToken token = default)
    {
        ThrowIfDisposed();
        ArgumentNullException.ThrowIfNull(user);
        token.ThrowIfCancellationRequested();
        dbContext.Update(user);
        await dbContext.SaveChangesAsync(token);
        return IdentityResult.Success;
    }

    public async Task<IdentityResult> DeleteAsync(User user, CancellationToken token = default)
    {
        ThrowIfDisposed();
        ArgumentNullException.ThrowIfNull(user);
        token.ThrowIfCancellationRequested();
        dbContext.Remove(user);
        await dbContext.SaveChangesAsync(token);
        return IdentityResult.Success;
    }

    public async Task<User?> FindByIdAsync(string userId, CancellationToken token = default)
    {
        ThrowIfDisposed();
        token.ThrowIfCancellationRequested();
        var id = ConvertIdFromString(userId);
        if (id <= 0) return null;
        return await dbContext.Set<User>()
            .FindAsync([id], token);
    }

    public async Task<User?> FindByNameAsync(string normalizedUserName,
        CancellationToken token = default)
    {
        ThrowIfDisposed();
        token.ThrowIfCancellationRequested();
        if (string.IsNullOrWhiteSpace(normalizedUserName)) return null;
        return await dbContext.Set<User>()
            .FirstOrDefaultAsync(u => u.NormalizedName == normalizedUserName, token);
    }

    public Task AddToRoleAsync(User user, string roleName, CancellationToken token = default)
    {
        return TaskUtils.Try(() =>
        {
            ThrowIfDisposed();
            ArgumentNullException.ThrowIfNull(user);
            ArgumentException.ThrowIfNullOrWhiteSpace(roleName);
            if (UserRole.TryParseFromNormalizedString(roleName, out var userType))
                user.UserRole = userType;
        }, token);
    }

    public Task RemoveFromRoleAsync(User user, string roleName, CancellationToken token = default)
    {
        return TaskUtils.Try(() =>
        {
            ThrowIfDisposed();
            ArgumentNullException.ThrowIfNull(user);
            ArgumentException.ThrowIfNullOrWhiteSpace(roleName);
            if (user.UserRole.ToNormalizedString() == roleName) user.UserRole = UserRole.User;
        }, token);
    }

    public Task<IList<string>> GetRolesAsync(User user, CancellationToken token = default)
    {
        return TaskUtils.Try<IList<string>>(() =>
        {
            ThrowIfDisposed();
            ArgumentNullException.ThrowIfNull(user);
            return [user.UserRole.ToString()];
        }, token);
    }

    public Task<bool> IsInRoleAsync(User user, string roleName, CancellationToken token = default)
    {
        return TaskUtils.Try(() =>
        {
            ThrowIfDisposed();
            ArgumentNullException.ThrowIfNull(user);
            ArgumentException.ThrowIfNullOrWhiteSpace(roleName);
            return user.UserRole.ToNormalizedString() == roleName;
        }, token);
    }

    public async Task<IList<User>> GetUsersInRoleAsync(string roleName,
        CancellationToken token = default)
    {
        ThrowIfDisposed();
        ArgumentException.ThrowIfNullOrWhiteSpace(roleName);
        token.ThrowIfCancellationRequested();
        if (UserRole.TryParseFromNormalizedString(roleName, out var userType))
            return await dbContext.Set<User>()
                .Where(u => u.UserRole == userType)
                .ToListAsync(token);
        return [];
    }

    public Task SetSecurityStampAsync(User user, string stamp, CancellationToken token = default)
    {
        return TaskUtils.Try(() =>
        {
            ThrowIfDisposed();
            ArgumentNullException.ThrowIfNull(user);
            user.SecurityStamp = stamp;
        }, token);
    }

    public Task<string?> GetSecurityStampAsync(User user, CancellationToken token = default)
    {
        return TaskUtils.Try(() =>
        {
            ThrowIfDisposed();
            ArgumentNullException.ThrowIfNull(user);
            return user.SecurityStamp;
        }, token);
    }

    private void ThrowIfDisposed()
    {
        ObjectDisposedException.ThrowIf(_disposed, this);
    }

    private static long ConvertIdFromString(string id)
    {
        return long.Parse(id);
    }
}
