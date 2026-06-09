using System.ComponentModel.DataAnnotations;
using Fachep.EduMgr.Entities;
using Fachep.EduMgr.WebAPI.Models;

namespace Fachep.EduMgr.WebAPI.Account.Models;

public class UserQuery : QueryBase
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

    [EmailAddress]
    public string? Email
    {
        get;
        set
        {
            ((IQueryBase)this).MarkAsSet(nameof(Email));
            field = value;
        }
    }

    public UserRole? UserRole
    {
        get;
        set
        {
            ((IQueryBase)this).MarkAsSet(nameof(UserRole));
            field = value;
        }
    }
}
