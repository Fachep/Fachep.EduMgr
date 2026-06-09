using AutoMapper;
using Fachep.EduMgr.Entities;
using Fachep.EduMgr.Infrastructure.Data;
using Fachep.EduMgr.WebAPI.Education.Data;
using Fachep.EduMgr.WebAPI.Education.Models;
using Fachep.EduMgr.WebAPI.Exceptions;
using Fachep.EduMgr.WebAPI.Services;
using Microsoft.EntityFrameworkCore;

namespace Fachep.EduMgr.WebAPI.Education.Services;

public class CourseService<TContext>(
    IRepositoryWithContext<TContext, Course, long> repository,
    IMapper mapper,
    IUnitOfWork<TContext> unitOfWork,
    IRepositoryWithContext<TContext, Enrollment> enrollmentRepository)
    : RestfulService<CourseDto, long, TContext, Course>(repository, mapper, unitOfWork),
        ICourseService
    where TContext : DbContext
{
    public override async Task UpdateAsync(CourseDto dto, CancellationToken token = default)
    {
        token.ThrowIfCancellationRequested();
        ArgumentNullException.ThrowIfNull(dto);
        var course = await repository.SelectFirstByIdAsync(dto.Id, token);
        if (course is null) throw new EntityNotFoundException("course", dto.Id, "id");

        if (course.Locked) throw new InvalidOperationException("course is locked");
        mapper.Map(dto, course);
        var transaction = false;
        if (dto.Locked)
        {
            await UnitOfWork.BeginTransactionAsync(token);
            transaction = true;
        }

        try
        {
            await repository.UpdateAsync(course, token);
            if (dto.Locked) await enrollmentRepository.ExecuteLockByCourseIdAsync(course.Id, token);
            await UnitOfWork.SaveChangesAsync(token);
        }
        catch
        {
            if (transaction) await UnitOfWork.RollbackTransactionAsync(token);
            throw;
        }

        if (transaction) await UnitOfWork.CommitTransactionAsync(token);
    }
}
