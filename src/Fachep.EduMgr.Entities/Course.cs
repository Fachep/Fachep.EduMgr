using Fachep.EduMgr.Infrastructure.Data;

namespace Fachep.EduMgr.Entities;

public class Course : Entity<long>, IHasOwner<long, Teacher>
{
    public Course()
    {
    }

    public Course(long id) : base(id)
    {
    }

    public bool Locked { get; set; }

    public long SubjectId { get; set; }
    public Subject Subject { get; set; } = null!;

    public virtual ICollection<Enrollment> Enrollments { get; set; } = [];
    public virtual ICollection<Student> Students { get; set; } = [];
    public virtual ICollection<Schedule> Schedules { get; set; } = [];

    public long? OwnerId { get; set; }
    public Teacher? Owner { get; set; }
}
