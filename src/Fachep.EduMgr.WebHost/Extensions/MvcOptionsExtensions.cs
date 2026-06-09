using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApplicationModels;

namespace Fachep.EduMgr.WebHost.Extensions;

public static class MvcOptionsExtensions
{
    extension(MvcOptions options)
    {
        public void UseRoutePrefix(string prefix)
        {
            options.Conventions.Add(new RoutePrefixConvention(prefix));
        }
    }

    private class RoutePrefixConvention(string prefix) : IApplicationModelConvention
    {
        private AttributeRouteModel RoutePrefix { get; } = new(new RouteAttribute(prefix));

        public void Apply(ApplicationModel application)
        {
            var selectors = application.Controllers
                .Where(c => c.Attributes.OfType<ApiControllerAttribute>().Any())
                .SelectMany(c => c.Selectors);
            foreach (var selector in selectors)
                if (selector.AttributeRouteModel is not null)
                    selector.AttributeRouteModel =
                        AttributeRouteModel.CombineAttributeRouteModel(RoutePrefix,
                            selector.AttributeRouteModel);
        }
    }
}
