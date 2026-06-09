namespace Fachep.EduMgr.Infrastructure.Data;

public interface IHasContext<out TContext>
{
    TContext Context { get; }
}
