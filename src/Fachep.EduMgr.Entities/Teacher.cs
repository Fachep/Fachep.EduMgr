namespace Fachep.EduMgr.Entities;

public class Teacher : User
{
    public Teacher() : base(UserRole.Teacher)
    {
    }

    public Teacher(long id) : base(id, UserRole.Teacher)
    {
    }

    public long? DepartmentId { get; set; }
    public Department? Department { get; set; }

    public virtual ICollection<Class> Classes { get; set; } = [];
    public virtual ICollection<Course> Courses { get; set; } = [];
}
