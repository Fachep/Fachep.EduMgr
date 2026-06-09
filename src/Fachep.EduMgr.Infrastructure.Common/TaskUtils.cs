namespace Fachep.EduMgr.Infrastructure.Common;

public static class TaskUtils
{
    public static Task<TResult> Try<TResult>(Func<TResult> func, CancellationToken token = default)
    {
        if (token.IsCancellationRequested) return Task.FromCanceled<TResult>(token);
        try
        {
            return Task.FromResult(func());
        }
        catch (Exception e)
        {
            return Task.FromException<TResult>(e);
        }
    }

    public static Task Try(Action action, CancellationToken token = default)
    {
        if (token.IsCancellationRequested) return Task.FromCanceled(token);
        try
        {
            action();
            return Task.CompletedTask;
        }
        catch (Exception e)
        {
            return Task.FromException(e);
        }
    }
}
