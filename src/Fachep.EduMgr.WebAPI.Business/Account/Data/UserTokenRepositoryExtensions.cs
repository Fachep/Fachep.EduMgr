using Fachep.EduMgr.Entities;
using Fachep.EduMgr.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using NodaTime;

namespace Fachep.EduMgr.WebAPI.Account.Data;

public static class UserTokenRepositoryExtensions
{
    extension(IRepositoryWithContext<DbContext, UserToken> repository)
    {
        public async Task<Guid?> GetTokenValueAsync(long userId, Guid deviceId,
            CancellationToken token = default)
        {
            token.ThrowIfCancellationRequested();
            return await repository.Queryable
                .Where(t => t.OwnerId == userId && t.DeviceId == deviceId)
                .Where(t => t.ExpirationTime > SystemClock.Instance.GetCurrentInstant())
                .Select(t => t.Value)
                .FirstOrDefaultAsync(token);
        }

        public async Task RemoveTokenAsync(long userId, Guid deviceId,
            CancellationToken token = default)
        {
            token.ThrowIfCancellationRequested();
            var userToken = await repository.Queryable
                .Where(t => t.OwnerId == userId && t.DeviceId == deviceId)
                .FirstOrDefaultAsync(token);
            if (userToken is not null) await repository.RemoveAsync(userToken, token);
        }

        public async Task RemoveTokensByUserAsync(long userId, CancellationToken token = default)
        {
            token.ThrowIfCancellationRequested();
            var userTokens = await repository.Queryable
                .Where(t => t.OwnerId == userId)
                .ToListAsync(token);
            await repository.RemoveRangeAsync(userTokens, token);
        }

        public async Task SetTokenAsync(long userId, Guid deviceId, Guid value,
            Instant expirationTime,
            CancellationToken token = default)
        {
            token.ThrowIfCancellationRequested();
            var userToken = await repository.Queryable
                .Where(t => t.OwnerId == userId && t.DeviceId == deviceId)
                .FirstOrDefaultAsync(token);
            if (userToken is not null)
            {
                userToken.Value = value;
                userToken.ExpirationTime = expirationTime;
                await repository.UpdateAsync(userToken, token);
            }
            else
            {
                await repository.AddAsync(
                    new UserToken
                    {
                        OwnerId = userId,
                        DeviceId = deviceId,
                        Value = value,
                        ExpirationTime = expirationTime
                    }, token);
            }
        }

        public async Task<bool> VerifyTokenAsync(long userId, Guid deviceId, Guid value,
            CancellationToken token = default)
        {
            token.ThrowIfCancellationRequested();
            return await repository.Queryable
                .Where(t => t.OwnerId == userId && t.DeviceId == deviceId)
                .Where(t => t.ExpirationTime > SystemClock.Instance.GetCurrentInstant())
                .Where(t => t.Value == value)
                .AnyAsync(token);
        }

        public async Task<bool> UpdateTokenAsync(long userId, Guid deviceId, Guid oldValue,
            Guid newValue,
            Instant newExpirationTime, CancellationToken token = default)
        {
            token.ThrowIfCancellationRequested();
            var userToken = await repository.Queryable
                .Where(t => t.OwnerId == userId && t.DeviceId == deviceId)
                .Where(t => t.ExpirationTime > SystemClock.Instance.GetCurrentInstant())
                .Where(t => t.Value == oldValue)
                .FirstOrDefaultAsync(token);
            if (userToken is null) return false;
            userToken.Value = newValue;
            userToken.ExpirationTime = newExpirationTime;
            await repository.UpdateAsync(userToken, token);
            return true;
        }
    }
}
