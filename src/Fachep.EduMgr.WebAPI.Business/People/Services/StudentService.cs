using AutoMapper;
using Fachep.EduMgr.Entities;
using Fachep.EduMgr.Infrastructure.Data;
using Fachep.EduMgr.WebAPI.Exceptions;
using Fachep.EduMgr.WebAPI.People.Models;
using Fachep.EduMgr.WebAPI.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Fachep.EduMgr.WebAPI.People.Services;

public class StudentService<TContext>(
    IRepositoryWithContext<TContext, Student, long> repository,
    IMapper mapper,
    IUnitOfWork<TContext> unitOfWork,
    UserManager<User> userManager)
    : RestfulService<StudentDto, long, TContext, Student>(repository, mapper, unitOfWork),
        IStudentService
    where TContext : DbContext
{
    public override Task<long> CreateAndGetKeyAsync(StudentDto dto,
        CancellationToken token = default)
    {
        return Task.FromException<long>(new InvalidOperationException());
    }

    public override Task CreateAsync(long id, StudentDto dto, CancellationToken token = default)
    {
        return Task.FromException(new InvalidOperationException());
    }

    public override Task DeleteAsync(long id, CancellationToken token = default)
    {
        return Task.FromException(new InvalidOperationException());
    }

    public override async Task UpdateAsync(StudentDto dto, CancellationToken token = default)
    {
        token.ThrowIfCancellationRequested();
        ArgumentNullException.ThrowIfNull(dto);
        var student = await Repository.SelectFirstByIdAsync(dto.Id, token);
        if (student is null) throw new EntityNotFoundException("student", dto.Id, "id");
        Mapper.Map(dto, student);
        var result = await userManager.UpdateAsync(student);
        if (!result.Succeeded)
            throw new InvalidOperationException($"Cannot update student: {result}");
    }
}
