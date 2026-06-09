using Fachep.EduMgr.Entities;
using Fachep.EduMgr.WebAPI.Annotations;
using Fachep.EduMgr.WebAPI.Models;

namespace Fachep.EduMgr.WebAPI.Education.Models;

public class CourseQuery : QueryBase
{
    [QueryPath(nameof(Course.OwnerId))]
    public long? TeacherId
    {
        get;
        set
        {
            ((IQueryBase)this).MarkAsSet(nameof(TeacherId));
            field = value;
        }
    }

    public long? SubjectId
    {
        get;
        set
        {
            ((IQueryBase)this).MarkAsSet(nameof(SubjectId));
            field = value;
        }
    }

    [QueryPath(nameof(Course.Subject), nameof(Subject.OwnerId))]
    public long? DepartmentId
    {
        get;
        set
        {
            ((IQueryBase)this).MarkAsSet(nameof(DepartmentId));
            field = value;
        }
    }

    [QueryPath(nameof(Course.Subject), nameof(Subject.Name))]
    public string? SubjectName
    {
        get;
        set
        {
            ((IQueryBase)this).MarkAsSet(nameof(SubjectName));
            field = value;
        }
    }

    public bool? Locked
    {
        get;
        set
        {
            ((IQueryBase)this).MarkAsSet(nameof(Locked));
            field = value;
        }
    }
}
