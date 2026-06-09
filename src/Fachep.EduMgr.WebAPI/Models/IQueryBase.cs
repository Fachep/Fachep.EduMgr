namespace Fachep.EduMgr.WebAPI.Models;

public interface IQueryBase
{
    bool IsSet(string propertyName);
    void MarkAsSet(string propertyName);

    Dictionary<string[], object?> ToDictionary();
}
