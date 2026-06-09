using Fachep.EduMgr.Infrastructure.Data;

namespace Fachep.EduMgr.Entities;

public class Major : Entity<long>, IHasName, IHasOwner<long, Department>
{
    public Major()
    {
    }

    public Major(long id) : base(id)
    {
    }

    public virtual ICollection<Class> Classes { get; set; } = [];

    public string Name { get; set; }

    public long? OwnerId { get; set; }
    public Department? Owner { get; set; }
}
