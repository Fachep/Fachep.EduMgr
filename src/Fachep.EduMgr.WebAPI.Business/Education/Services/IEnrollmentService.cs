using Fachep.EduMgr.WebAPI.Education.Models;
using Fachep.EduMgr.WebAPI.Services;

namespace Fachep.EduMgr.WebAPI.Education.Services;

public interface IEnrollmentService : IRestfulService<EnrollmentDto>
{
    Task<EnrollmentDto?> GetAsync(long studentId, long courseId, CancellationToken token = default);
}
