using AutoMapper;
using Fachep.EduMgr.Entities;
using Fachep.EduMgr.Infrastructure.Data;
using Fachep.EduMgr.WebAPI.Education.Data;
using Fachep.EduMgr.WebAPI.Education.Models;
using Fachep.EduMgr.WebAPI.Exceptions;
using Fachep.EduMgr.WebAPI.Services;
using Microsoft.EntityFrameworkCore;

namespace Fachep.EduMgr.WebAPI.Education.Services;

public class EnrollmentService<TContext>(
    IRepositoryWithContext<TContext, Enrollment> repository,
    IMapper mapper,
    IUnitOfWork<TContext> unitOfWork)
    : RestfulService<EnrollmentDto, TContext, Enrollment>(repository, mapper, unitOfWork),
        IEnrollmentService
    where TContext : DbContext
{
    public override async Task UpdateAsync(EnrollmentDto dto, CancellationToken token = default)
    {
        var enrollment =
            await repository.SelectByStudentAndCourseAsync(dto.StudentId, dto.CourseId, token);
        if (enrollment is null)
            throw new EntityNotFoundException("enrollment",
                $"StudentId == {dto.StudentId} && CourseId == {dto.CourseId}");
        mapper.Map(dto, enrollment);
        await repository.UpdateAsync(enrollment, token);
        await unitOfWork.SaveChangesAsync(token);
    }

    public override async Task DeleteAsync(EnrollmentDto dto, CancellationToken token = default)
    {
        var enrollment =
            await repository.SelectByStudentAndCourseAsync(dto.StudentId, dto.CourseId, token);
        if (enrollment is null) return;
        await repository.RemoveAsync(enrollment, token);
        await unitOfWork.SaveChangesAsync(token);
    }

    public async Task<EnrollmentDto?> GetAsync(long studentId, long courseId,
        CancellationToken token = default)
    {
        token.ThrowIfCancellationRequested();
        var enrollment = await repository.SelectByStudentAndCourseAsync(studentId, courseId, token);
        return mapper.Map<Enrollment?, EnrollmentDto?>(enrollment);
    }

    public override async Task CreateAsync(EnrollmentDto dto, CancellationToken token = default)
    {
        token.ThrowIfCancellationRequested();
        ArgumentNullException.ThrowIfNull(dto);
        var enrollment = mapper.Map<EnrollmentDto, Enrollment>(dto);
        await repository.AddAsync(enrollment, token);
        await unitOfWork.SaveChangesAsync(token);
    }
}
