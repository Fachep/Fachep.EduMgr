using System.Security.Claims;
using AutoMapper;
using Fachep.EduMgr.Entities;
using Fachep.EduMgr.Infrastructure.Data;
using Fachep.EduMgr.WebAPI.Account.Models;
using Fachep.EduMgr.WebAPI.Exceptions;
using Fachep.EduMgr.WebAPI.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Fachep.EduMgr.WebAPI.Account.Services;

public class UserService<TContext>(
    IRepositoryWithContext<TContext, User, long> repository,
    IMapper mapper,
    IUnitOfWork<TContext> unitOfWork,
    UserManager<User> userManager)
    : RestfulService<UserDto, long, TContext, User>(repository, mapper, unitOfWork), IUserService
    where TContext : DbContext
{
    public async Task<List<UserDto>> PageByNameAsync(int limit, int offset = 0,
        bool ascending = true,
        CancellationToken token = default)
    {
        var users = await Repository.GetPageOrderedByNameAsync(limit, offset, ascending, token);
        return Mapper.Map<List<User>, List<UserDto>>(users);
    }

    public override async Task<long> CreateAndGetKeyAsync(UserDto dto,
        CancellationToken token = default)
    {
        token.ThrowIfCancellationRequested();
        ArgumentNullException.ThrowIfNull(dto);
        var user = Mapper.Map<UserDto, User>(dto);
        var result = await userManager.CreateAsync(user);
        if (!result.Succeeded) throw new InvalidOperationException($"Cannot create user: {result}");
        return user.Id;
    }

    public override async Task CreateAsync(long id, UserDto dto, CancellationToken token = default)
    {
        token.ThrowIfCancellationRequested();
        ArgumentNullException.ThrowIfNull(dto);
        ArgumentOutOfRangeException.ThrowIfZero(id);
        var user = Mapper.Map<UserDto, User>(dto with { Id = id });
        var result = await userManager.CreateAsync(user);
        if (!result.Succeeded) throw new InvalidOperationException($"Cannot create user: {result}");
    }

    public override async Task UpdateAsync(UserDto dto, CancellationToken token = default)
    {
        token.ThrowIfCancellationRequested();
        ArgumentNullException.ThrowIfNull(dto);
        var user = await Repository.SelectFirstByIdAsync(dto.Id, token);
        if (user is null) throw new EntityNotFoundException("user", dto.Id, "id");
        Mapper.Map(dto, user);
        var result = await userManager.UpdateAsync(user);
        if (!result.Succeeded) throw new InvalidOperationException($"Cannot update user: {result}");
    }

    public override async Task DeleteAsync(long id, CancellationToken token = default)
    {
        token.ThrowIfCancellationRequested();
        var user = await Repository.SelectFirstByIdAsync(id, token);
        if (user is null) return;

        var result = await userManager.DeleteAsync(user);
        if (!result.Succeeded) throw new InvalidOperationException($"Cannot delete user: {result}");
    }

    public async Task<IList<string>> GetRolesAsync(long id, CancellationToken token = default)
    {
        token.ThrowIfCancellationRequested();
        var user = await Repository.SelectFirstByIdAsync(id, token);
        if (user is null) throw new EntityNotFoundException("user", id);

        return await userManager.GetRolesAsync(user);
    }

    public async Task AddToRoleAsync(long id, string roleName, CancellationToken token = default)
    {
        token.ThrowIfCancellationRequested();
        ArgumentException.ThrowIfNullOrWhiteSpace(roleName);
        var user = await Repository.SelectFirstByIdAsync(id, token);
        if (user is null) throw new EntityNotFoundException("user", id);

        var result = await userManager.AddToRoleAsync(user, roleName);
        if (!result.Succeeded)
            throw new InvalidOperationException($"Cannot add user to role: {result}");
    }

    public async Task RemoveFromRoleAsync(long id, string roleName,
        CancellationToken token = default)
    {
        token.ThrowIfCancellationRequested();
        ArgumentException.ThrowIfNullOrWhiteSpace(roleName);
        var user = await Repository.SelectFirstByIdAsync(id, token);
        if (user is null) throw new EntityNotFoundException("user", id);

        var result = await userManager.RemoveFromRoleAsync(user, roleName);
        if (!result.Succeeded)
            throw new InvalidOperationException($"Cannot remove user from role: {result}");
    }

    public async Task AddToRolesAsync(long id, IEnumerable<string> roleNames,
        CancellationToken token = default)
    {
        token.ThrowIfCancellationRequested();
        var user = await Repository.SelectFirstByIdAsync(id, token);
        if (user is null) throw new EntityNotFoundException("user", id);

        var result = await userManager.AddToRolesAsync(user, roleNames);
        if (!result.Succeeded)
            throw new InvalidOperationException($"Cannot add user to roles: {result}");
    }

    public async Task RemoveFromRolesAsync(long id, IEnumerable<string> roleNames,
        CancellationToken token = default)
    {
        token.ThrowIfCancellationRequested();
        var user = await Repository.SelectFirstByIdAsync(id, token);
        if (user is null) throw new EntityNotFoundException("user", id);

        var result = await userManager.RemoveFromRolesAsync(user, roleNames);
        if (!result.Succeeded)
            throw new InvalidOperationException($"Cannot remove user from roles: {result}");
    }

    public async Task<List<UserDto>> GetUsersInRoleAsync(string roleName,
        CancellationToken token = default)
    {
        token.ThrowIfCancellationRequested();
        ArgumentException.ThrowIfNullOrWhiteSpace(roleName);
        var users = await userManager.GetUsersInRoleAsync(roleName);
        return Mapper.Map<IList<User>, List<UserDto>>(users);
    }

    public async Task ForceChangePasswordAsync(long id, string password,
        CancellationToken token = default)
    {
        token.ThrowIfCancellationRequested();
        ArgumentException.ThrowIfNullOrWhiteSpace(password);
        var user = await Repository.SelectFirstByIdAsync(id, token);
        if (user is null) throw new EntityNotFoundException("user", id);

        await UnitOfWork.BeginTransactionAsync(token);
        try
        {
            var result = await userManager.RemovePasswordAsync(user);
            if (!result.Succeeded)
                throw new InvalidOperationException($"Cannot remove password: {result}");
            result = await userManager.AddPasswordAsync(user, password);
            if (!result.Succeeded)
                throw new InvalidOperationException($"Cannot add password: {result}");
        }
        catch
        {
            await UnitOfWork.RollbackTransactionAsync(token);
            throw;
        }

        await UnitOfWork.CommitTransactionAsync(token);
    }

    public async Task RemovePasswordAsync(long id, CancellationToken token = default)
    {
        token.ThrowIfCancellationRequested();
        var user = await Repository.SelectFirstByIdAsync(id, token);
        if (user is null) throw new EntityNotFoundException("user", id);

        var result = await userManager.RemovePasswordAsync(user);
        if (!result.Succeeded)
            throw new InvalidOperationException($"Cannot remove password: {result}");
    }

    public async Task AddPasswordAsync(long id, string password, CancellationToken token = default)
    {
        token.ThrowIfCancellationRequested();
        ArgumentException.ThrowIfNullOrWhiteSpace(password);
        var user = await Repository.SelectFirstByIdAsync(id, token);
        if (user is null) throw new EntityNotFoundException("user", id);

        var result = await userManager.AddPasswordAsync(user, password);
        if (!result.Succeeded)
            throw new InvalidOperationException($"Cannot add password: {result}");
    }

    public async Task<UserDto?> GetUser(ClaimsPrincipal principal,
        CancellationToken token = default)
    {
        token.ThrowIfCancellationRequested();
        ArgumentNullException.ThrowIfNull(principal);
        var user = await userManager.GetUserAsync(principal);
        return Mapper.Map<User?, UserDto?>(user);
    }
}
