using System.ComponentModel.DataAnnotations;
using Fachep.EduMgr.Infrastructure.Data;

namespace Fachep.EduMgr.Entities;

public class Enrollment : IEntity, IHasOwner<long, Student>
{
    public bool Locked { get; set; }

    public long CourseId { get; init; }
    public Course Course { get; init; } = null!;

    public object?[] GetKeys()
    {
        return [OwnerId, CourseId];
    }

    [Required] public long? OwnerId { get; init; }

    public Student Owner { get; init; } = null!;
}
