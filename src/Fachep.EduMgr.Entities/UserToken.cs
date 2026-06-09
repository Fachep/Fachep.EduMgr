using System.ComponentModel.DataAnnotations;
using Fachep.EduMgr.Infrastructure.Data;
using NodaTime;

namespace Fachep.EduMgr.Entities;

public class UserToken : Entity, IHasOwner<long, User>, IExpirable
{
    public Guid DeviceId { get; init; }
    public Guid Value { get; set; }

    public Instant ExpirationTime { get; set; }

    [Required] public long? OwnerId { get; init; }

    public User Owner { get; set; } = null!;

    public override object?[] GetKeys()
    {
        return [DeviceId, OwnerId];
    }
}
