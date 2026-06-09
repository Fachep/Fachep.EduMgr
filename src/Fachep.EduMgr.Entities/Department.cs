using Fachep.EduMgr.Infrastructure.Data;

namespace Fachep.EduMgr.Entities;

public class Department : Entity<long>, IHasName
{
    public Department()
    {
    }

    public Department(long id) : base(id)
    {
    }

    public virtual ICollection<Teacher> Teachers { get; } = [];
    public virtual ICollection<Major> Majors { get; } = [];
    public virtual ICollection<Subject> Subjects { get; } = [];

    public string Name { get; set; }
}
