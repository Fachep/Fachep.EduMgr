using Fachep.EduMgr.WebAPI.Conventions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace Fachep.EduMgr.WebAPI.Configurations;

public class ExcludeControllersMvcOptionsConfiguration(ExcludeControllersConvention convention)
    : IConfigureOptions<MvcOptions>
{
    public void Configure(MvcOptions options)
    {
        options.Conventions.Add(convention);
    }
}
