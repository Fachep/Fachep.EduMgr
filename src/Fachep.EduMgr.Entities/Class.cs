using Fachep.EduMgr.Infrastructure.Data;

namespace Fachep.EduMgr.Entities;

public class Class : Entity<long>, IHasName, IHasOwner<long, Teacher>
{
    public Class()
    {
    }

    public Class(long id) : base(id)
    {
    }

    public virtual ICollection<Student> Students { get; } = [];

    public long? MajorId { get; set; }
    public Major? Major { get; set; }

    public string? Name { get; set; }

    public long? OwnerId { get; set; }
    public Teacher? Owner { get; set; }
}
