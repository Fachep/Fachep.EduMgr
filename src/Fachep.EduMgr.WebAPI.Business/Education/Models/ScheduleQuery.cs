using System.ComponentModel.DataAnnotations;
using Fachep.EduMgr.WebAPI.Models;

namespace Fachep.EduMgr.WebAPI.Education.Models;

public class ScheduleQuery : QueryBase
{
    public long? CourseId
    {
        get;
        set
        {
            ((IQueryBase)this).MarkAsSet(nameof(CourseId));
            field = value;
        }
    }

    public string? Location
    {
        get;
        set
        {
            ((IQueryBase)this).MarkAsSet(nameof(Location));
            field = value;
        }
    }

    [Range(0, 43)]
    public int? Week
    {
        get;
        set
        {
            ((IQueryBase)this).MarkAsSet(nameof(Week));
            field = value;
        }
    }

    [Range(0, 6)]
    public int? Day
    {
        get;
        set
        {
            ((IQueryBase)this).MarkAsSet(nameof(Day));
            field = value;
        }
    }
}
