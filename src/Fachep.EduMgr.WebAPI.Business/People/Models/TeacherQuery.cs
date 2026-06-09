using Fachep.EduMgr.WebAPI.Models;

namespace Fachep.EduMgr.WebAPI.People.Models;

public class TeacherQuery : QueryBase
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

    public int? DepartmentId
    {
        get;
        set
        {
            ((IQueryBase)this).MarkAsSet(nameof(DepartmentId));
            field = value;
        }
    }
}
