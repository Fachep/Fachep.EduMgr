namespace Fachep.EduMgr.Entities;

public class Student : User
{
    public Student() : base(UserRole.Student)
    {
    }

    public Student(long id) : base(id, UserRole.Student)
    {
    }

    public long? ClassId { get; set; }
    public Class? Class { get; set; }

    public virtual ICollection<Enrollment> Enrollments { get; set; } = [];
    public virtual ICollection<Course> Courses { get; set; } = [];
}
