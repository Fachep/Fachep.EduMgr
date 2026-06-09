using Fachep.EduMgr.Entities;
using Fachep.EduMgr.WebAPI.Annotations;
using Fachep.EduMgr.WebAPI.Models;

namespace Fachep.EduMgr.WebAPI.Education.Models;

public class SubjectQuery : QueryBase
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

    [QueryPath(nameof(Subject.OwnerId))]
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
