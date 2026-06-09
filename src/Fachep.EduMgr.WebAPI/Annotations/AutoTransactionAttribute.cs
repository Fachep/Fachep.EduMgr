using Fachep.EduMgr.Infrastructure.Data;

namespace Fachep.EduMgr.WebAPI.Annotations;

[AttributeUsage(AttributeTargets.Assembly | AttributeTargets.Class | AttributeTargets.Method)]
public class AutoTransactionAttribute : Attribute
{
    public enum CommitType
    {
        Always,
        OnStatusCodes,
        Never
    }

    public Type? ContextType { get; set; } = null;

    public CommitType AutoCommit { get; set; } = CommitType.OnStatusCodes;

    public int[] StatusCodes { get; set; } = [];

    public Range[] StatusCodeRanges { get; set; } = [200..299];

    internal Type UnitOfWorkType =>
        ContextType is null
            ? typeof(IUnitOfWork)
            : typeof(IUnitOfWork<>).MakeGenericType(ContextType);

    internal bool ShouldCommit(int statusCode)
    {
        return AutoCommit switch
        {
            CommitType.Always => true,
            CommitType.Never => false,
            CommitType.OnStatusCodes => IsStatusCodeInRanges(statusCode),
            _ => false
        };
    }

    private bool IsStatusCodeInRanges(int statusCode)
    {
        if (StatusCodes.Contains(statusCode)) return true;

        foreach (var range in StatusCodeRanges)
            if (range.End is { IsFromEnd: true, Value: 0 })
            {
                if (statusCode >= range.Start.Value) return true;
            }
            else
            {
                if (statusCode >= range.Start.Value && statusCode <= range.End.Value) return true;
            }

        return false;
    }
}
