namespace Fachep.EduMgr.Infrastructure.Data;

public abstract class Entity : IEntity
{
    public abstract object?[] GetKeys();
}

public abstract class Entity<TKey> : Entity, IEntity<TKey>
    where TKey : struct, IEquatable<TKey>
{
    protected Entity()
    {
        Id = default!;
    }

    protected Entity(TKey id)
    {
        Id = id;
    }

    public TKey Id { get; protected set; }

    public override object?[] GetKeys()
    {
        return [Id];
    }
}
