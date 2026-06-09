using System.Security.Claims;
using Fachep.EduMgr.WebAPI.Account.Models;
using Fachep.EduMgr.WebAPI.Services;

namespace Fachep.EduMgr.WebAPI.Account.Services;

public interface IUserService : IRestfulService<UserDto, long>
{
    Task<List<UserDto>> PageByNameAsync(int limit, int offset = 0, bool ascending = true,
        CancellationToken token = default);

    Task<IList<string>> GetRolesAsync(long id, CancellationToken token = default);
    Task AddToRoleAsync(long id, string roleName, CancellationToken token = default);
    Task RemoveFromRoleAsync(long id, string roleName, CancellationToken token = default);
    Task AddToRolesAsync(long id, IEnumerable<string> roleNames, CancellationToken token = default);

    Task RemoveFromRolesAsync(long id, IEnumerable<string> roleNames,
        CancellationToken token = default);

    Task<List<UserDto>> GetUsersInRoleAsync(string roleName, CancellationToken token = default);
    Task ForceChangePasswordAsync(long id, string password, CancellationToken token = default);
    Task RemovePasswordAsync(long id, CancellationToken token = default);
    Task AddPasswordAsync(long id, string password, CancellationToken token = default);
    Task<UserDto?> GetUser(ClaimsPrincipal principal, CancellationToken token = default);
}
