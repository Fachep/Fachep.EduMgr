using NodaTime;

namespace Fachep.EduMgr.Infrastructure.Data;

public interface IExpirable
{
    Instant ExpirationTime { get; }
}
