namespace Fachep.EduMgr.Infrastructure.Data;

public interface IHasOwner<TOwnerKey>
    where TOwnerKey : struct, IEquatable<TOwnerKey>
{
    TOwnerKey? OwnerId { get; }
}

public interface IHasOwner<TOwnerKey, TOwner> : IHasOwner<TOwnerKey>
    where TOwner : class, IEntity<TOwnerKey>
    where TOwnerKey : struct, IEquatable<TOwnerKey>
{
    TOwner? Owner { get; }
}
