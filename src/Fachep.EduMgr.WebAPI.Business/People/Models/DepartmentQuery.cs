using Fachep.EduMgr.WebAPI.Models;

namespace Fachep.EduMgr.WebAPI.People.Models;

public class DepartmentQuery : QueryBase
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
}
