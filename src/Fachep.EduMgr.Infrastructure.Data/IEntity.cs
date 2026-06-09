namespace Fachep.EduMgr.Infrastructure.Data;

public interface IEntity
{
    object?[] GetKeys();
}

public interface IEntity<TKey> : IEntity
    where TKey : struct, IEquatable<TKey>
{
    TKey Id { get; }
}
