using Fachep.EduMgr.Entities;
using Fachep.EduMgr.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Fachep.EduMgr.WebAPI.Account.Data;

public static class UserRepositoryExtensions
{
    extension(IRepositoryWithContext<DbContext, User, long> repository)
    {
        public async Task<User?> FindByEmailAsync(string normalizedEmail,
            CancellationToken token = default)
        {
            if (string.IsNullOrWhiteSpace(normalizedEmail)) return null;
            token.ThrowIfCancellationRequested();
            return await repository.Queryable
                .FirstOrDefaultAsync(u => u.NormalizedEmail == normalizedEmail, token);
        }
    }
}
