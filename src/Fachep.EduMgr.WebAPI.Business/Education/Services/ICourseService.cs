using Fachep.EduMgr.WebAPI.Education.Models;
using Fachep.EduMgr.WebAPI.Services;

namespace Fachep.EduMgr.WebAPI.Education.Services;

public interface ICourseService : IRestfulService<CourseDto, long>
{
}
