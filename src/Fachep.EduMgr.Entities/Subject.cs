using Fachep.EduMgr.Infrastructure.Data;

namespace Fachep.EduMgr.Entities;

public class Subject : Entity<long>, IHasName, IHasOwner<long, Department>
{
    public Subject()
    {
    }

    public Subject(long id) : base(id)
    {
    }

    public virtual ICollection<Course> Courses { get; set; } = [];
    public virtual ICollection<Enrollment> Enrollments { get; set; } = [];
    public virtual ICollection<Student> Students { get; set; } = [];

    public string Name { get; set; }

    public long? OwnerId { get; set; }
    public Department? Owner { get; set; }
}
