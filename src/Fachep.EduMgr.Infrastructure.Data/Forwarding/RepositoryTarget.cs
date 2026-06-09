using System.Diagnostics.CodeAnalysis;

namespace Fachep.EduMgr.Infrastructure.Data.Forwarding;

internal record RepositoryTarget(
    [DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.Interfaces)]
    Type ImplementationType,
    [DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.Interfaces)]
    Type ImplementationWithKeyType,
    Type? DefaultContextType = null);
