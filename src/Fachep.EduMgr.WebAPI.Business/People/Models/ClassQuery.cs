using Fachep.EduMgr.Entities;
using Fachep.EduMgr.WebAPI.Annotations;
using Fachep.EduMgr.WebAPI.Models;

namespace Fachep.EduMgr.WebAPI.People.Models;

public class ClassQuery : QueryBase
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

    [QueryPath(nameof(Class.OwnerId))]
    public long? TeacherId
    {
        get;
        set
        {
            ((IQueryBase)this).MarkAsSet(nameof(TeacherId));
            field = value;
        }
    }

    [QueryPath(nameof(Class.Major), nameof(Major.OwnerId))]
    public long? DepartmentId
    {
        get;
        set
        {
            ((IQueryBase)this).MarkAsSet(nameof(DepartmentId));
            field = value;
        }
    }

    public long? MajorId
    {
        get;
        set
        {
            ((IQueryBase)this).MarkAsSet(nameof(MajorId));
            field = value;
        }
    }
}
