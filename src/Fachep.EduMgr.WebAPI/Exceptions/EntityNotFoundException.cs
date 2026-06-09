using System.Runtime.CompilerServices;

namespace Fachep.EduMgr.WebAPI.Exceptions;

public class EntityNotFoundException : NotFoundException
{
    private readonly string? _name;

    private readonly string? _query;

    public EntityNotFoundException(object? value,
        [CallerArgumentExpression(nameof(value))] string? query = null)
    {
        _query = $"${query} == ${value}";
    }

    public EntityNotFoundException(string entityName)
    {
        _name = entityName;
    }

    public EntityNotFoundException(string entityName, string? query)
    {
        _name = entityName;
        _query = query;
    }

    public EntityNotFoundException(string entityName, object? value,
        [CallerArgumentExpression(nameof(value))]
        string? query = null) : this(value, query)
    {
        _name = entityName;
    }

    public EntityNotFoundException()
    {
    }

    public override string Message =>
        $"Cannot find {_name ?? "entity"} matching {_query ?? "given criteria"}.";
}
