namespace Fachep.EduMgr.WebAPI.Annotations;

[AttributeUsage(AttributeTargets.Property)]
public class QueryPathAttribute(params string[] paths) : Attribute
{
    public string[] Paths { get; init; } = paths;
}
