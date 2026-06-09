using Fachep.EduMgr.Entities;
using Fachep.EduMgr.WebAPI.Annotations;
using Fachep.EduMgr.WebAPI.Models;

namespace Fachep.EduMgr.WebAPI.People.Models;

public class StudentQuery : QueryBase
{
    public string? Name
    {
        get;
        set
        {
            ((IQueryBase)this).MarkAsSet(nameof(Name));
            field = value;
        }
    }

    public long? ClassId
    {
        get;
        set
        {
            ((IQueryBase)this).MarkAsSet(nameof(ClassId));
            field = value;
        }
    }

    [QueryPath(nameof(Student.Class), nameof(Class.MajorId))]
    public long? MajorId
    {
        get;
        set
        {
            ((IQueryBase)this).MarkAsSet(nameof(MajorId));
            field = value;
        }
    }

    [QueryPath(nameof(Student.Class), nameof(Class.MajorId), nameof(Major.OwnerId))]
    public long? DepartmentId
    {
        get;
        set
        {
            ((IQueryBase)this).MarkAsSet(nameof(DepartmentId));
            field = value;
        }
    }
}
