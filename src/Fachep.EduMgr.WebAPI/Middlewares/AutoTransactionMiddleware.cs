using Fachep.EduMgr.Infrastructure.Data;
using Fachep.EduMgr.WebAPI.Annotations;
using Microsoft.AspNetCore.Http;

namespace Fachep.EduMgr.WebAPI.Middlewares;

public class AutoTransactionMiddleware(RequestDelegate next)
{
    private static AutoTransactionAttribute? GetMetadata(HttpContext context)
    {
        var endpoint = context.GetEndpoint();
        return endpoint?.Metadata.GetMetadata<AutoTransactionAttribute>();
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var metadata = GetMetadata(context);
        IUnitOfWork? unitOfWork = null;
        if (metadata is not null)
            unitOfWork = context.RequestServices.GetService(metadata.UnitOfWorkType) as IUnitOfWork;
        if (unitOfWork is not null) await unitOfWork.BeginTransactionAsync(context.RequestAborted);
        await next(context);
        if (unitOfWork is not null && metadata!.ShouldCommit(context.Response.StatusCode))
            await unitOfWork.CommitTransactionAsync(context.RequestAborted);
    }
}
