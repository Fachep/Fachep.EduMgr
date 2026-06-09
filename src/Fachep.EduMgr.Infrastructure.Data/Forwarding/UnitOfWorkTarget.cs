using System.Diagnostics.CodeAnalysis;

namespace Fachep.EduMgr.Infrastructure.Data.Forwarding;

internal record UnitOfWorkTarget(
    [DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.Interfaces)]
    Type ImplementationType);
