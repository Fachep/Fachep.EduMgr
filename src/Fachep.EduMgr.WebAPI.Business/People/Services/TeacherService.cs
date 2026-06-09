using AutoMapper;
using Fachep.EduMgr.Entities;
using Fachep.EduMgr.Infrastructure.Data;
using Fachep.EduMgr.WebAPI.Exceptions;
using Fachep.EduMgr.WebAPI.People.Models;
using Fachep.EduMgr.WebAPI.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Fachep.EduMgr.WebAPI.People.Services;

public class TeacherService<TContext>(
    IRepositoryWithContext<TContext, Teacher, long> repository,
    IMapper mapper,
    IUnitOfWork<TContext> unitOfWork,
    UserManager<User> userManager)
    : RestfulService<TeacherDto, long, TContext, Teacher>(repository, mapper, unitOfWork),
        ITeacherService
    where TContext : DbContext
{
    public override Task<long> CreateAndGetKeyAsync(TeacherDto dto,
        CancellationToken token = default)
    {
        return Task.FromException<long>(new InvalidOperationException());
    }

    public override Task CreateAsync(long id, TeacherDto dto, CancellationToken token = default)
    {
        return Task.FromException(new InvalidOperationException());
    }

    public override Task DeleteAsync(long id, CancellationToken token = default)
    {
        return Task.FromException(new InvalidOperationException());
    }

    public override async Task UpdateAsync(TeacherDto dto, CancellationToken token = default)
    {
        token.ThrowIfCancellationRequested();
        ArgumentNullException.ThrowIfNull(dto);
        var teacher = await Repository.SelectFirstByIdAsync(dto.Id, token);
        if (teacher is null) throw new EntityNotFoundException("teacher", dto.Id, "id");
        Mapper.Map(dto, teacher);
        var result = await userManager.UpdateAsync(teacher);
        if (!result.Succeeded)
            throw new InvalidOperationException($"Cannot update teacher: {result}");
    }
}
