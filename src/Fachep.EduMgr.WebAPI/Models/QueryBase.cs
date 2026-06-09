using System.Reflection;
using Fachep.EduMgr.WebAPI.Annotations;

namespace Fachep.EduMgr.WebAPI.Models;

public abstract class QueryBase : IQueryBase
{
    private readonly HashSet<string> _properties = [];

    public bool IsSet(string propertyName)
    {
        return _properties.Contains(propertyName);
    }

    void IQueryBase.MarkAsSet(string propertyName)
    {
        _properties.Add(propertyName);
    }

    public Dictionary<string[], object?> ToDictionary()
    {
        var dict = new Dictionary<string[], object?>();
        var type = GetType();
        foreach (var prop in type.GetProperties())
        {
            if (!IsSet(prop.Name)) continue;
            string[] paths = [prop.Name];
            if (prop.GetCustomAttribute<QueryPathAttribute>() is { Paths: var queryPaths })
                paths = queryPaths;
            dict[paths] = prop.GetValue(this);
        }

        return dict;
    }
}
