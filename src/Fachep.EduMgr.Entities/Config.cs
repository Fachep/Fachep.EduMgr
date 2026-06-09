using Fachep.EduMgr.Infrastructure.Data;

namespace Fachep.EduMgr.Entities;

public class Config() : Entity<bool>(true)
{
    public DateOnly StartDate { get; set; }
    public DayOfWeek StartDayOfWeek { get; set; }
    public List<SectionInfo> Sections { get; set; } = [];
}
