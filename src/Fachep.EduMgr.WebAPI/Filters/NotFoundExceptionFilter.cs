using Fachep.EduMgr.WebAPI.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Fachep.EduMgr.WebAPI.Filters;

public class NotFoundExceptionFilter : IExceptionFilter
{
    public void OnException(ExceptionContext context)
    {
        if (context.Exception is NotFoundException)
        {
            context.ExceptionHandled = true;
            context.Result = new NotFoundResult();
        }
    }
}
