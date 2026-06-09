using Fachep.EduMgr.WebAPI.Configurations;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.Extensions.Options;

namespace Fachep.EduMgr.WebAPI.Conventions;

public class ExcludeControllersConvention(IOptions<ExcludeControllersOptions> options)
    : IControllerModelConvention
{
    public void Apply(ControllerModel controller)
    {
        var lookup = options.Value.GetAlternateLookup<ReadOnlySpan<char>>();
        if (string.IsNullOrWhiteSpace(controller.ControllerType.FullName)) return;

        var span = controller.ControllerType.FullName.AsSpan();
        while (span.Length > 0)
        {
            if (lookup.TryGetValue(span, out var isDisabled))
            {
                if (isDisabled) controller.Actions.Clear();
                break;
            }

            var lastDotIndex = span.LastIndexOf('.');
            if (lastDotIndex >= 0)
                span = span[..lastDotIndex];
            else
                break;
        }

        if (lookup.TryGetValue("*", out var disableAll) && disableAll) controller.Actions.Clear();
    }
}
