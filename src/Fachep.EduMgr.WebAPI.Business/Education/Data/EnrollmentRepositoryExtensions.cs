using Fachep.EduMgr.Entities;
using Fachep.EduMgr.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Fachep.EduMgr.WebAPI.Education.Data;

public static class EnrollmentRepositoryExtensions
{
    extension(IRepositoryWithContext<DbContext, Enrollment> repository)
    {
        public async Task<Enrollment?> SelectByStudentAndCourseAsync(long studentId, long courseId,
            CancellationToken token = default)
        {
            token.ThrowIfCancellationRequested();
            return await repository.Queryable
                .FirstOrDefaultAsync(e => e.OwnerId == studentId && e.CourseId == courseId, token);
        }

        public async Task<bool> ExistsByStudentAndCourseAsync(long studentId, long courseId,
            CancellationToken token = default)
        {
            token.ThrowIfCancellationRequested();
            return await repository.Queryable
                .AnyAsync(e => e.OwnerId == studentId && e.CourseId == courseId, token);
        }

        public async Task<bool?> SelectIsLockedByStudentAndCourseAsync(long studentId,
            long courseId,
            CancellationToken token = default)
        {
            token.ThrowIfCancellationRequested();
            return await repository.Queryable
                .Where(e => e.OwnerId == studentId && e.CourseId == courseId)
                .Select(e => (bool?)e.Locked)
                .FirstOrDefaultAsync(token);
        }

        public async Task<int> ExecuteLockByCourseIdAsync(long courseId,
            CancellationToken token = default)
        {
            token.ThrowIfCancellationRequested();
            return await repository.Queryable
                .Where(e => e.CourseId == courseId && !e.Locked)
                .ExecuteUpdateAsync(b => b.SetProperty(
                    e => e.Locked,
                    e => true
                ), token);
        }
    }
}
