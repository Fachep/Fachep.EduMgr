using System.Reflection;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Fachep.EduMgr.WebAPI.Configurations;

public class SwaggerGenOptionsConfiguration : IConfigureOptions<SwaggerGenOptions>
{
    public void Configure(SwaggerGenOptions options)
    {
        options.AddSecurityDefinition(JwtBearerDefaults.AuthenticationScheme,
            new OpenApiSecurityScheme
            {
                Type = SecuritySchemeType.Http,
                Scheme = JwtBearerDefaults.AuthenticationScheme,
                BearerFormat = "JWT",
                In = ParameterLocation.Header
            });
        options.AddSecurityDefinition("Refresh",
            new OpenApiSecurityScheme
            {
                Type = SecuritySchemeType.Http,
                Scheme = JwtBearerDefaults.AuthenticationScheme,
                BearerFormat = "JWT",
                In = ParameterLocation.Header
            });
        options.OperationFilter<SecurityRequirementOperationFilter>(JwtBearerDefaults
            .AuthenticationScheme);
        options.OperationFilter<OperationIdFilter>();
    }

    private class SecurityRequirementOperationFilter(string defaultScheme) : IOperationFilter
    {
        public void Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            if (context.MethodInfo.GetCustomAttributes<AllowAnonymousAttribute>().Any()) return;
            var controller = context.MethodInfo.DeclaringType;
            string? scheme = null;
            if (controller is not null &&
                !controller.GetCustomAttributes<AllowAnonymousAttribute>().Any())
            {
                var controllerAttrs = controller.GetCustomAttributes<AuthorizeAttribute>()
                    .Where(a => string.IsNullOrWhiteSpace(a.Policy));
                foreach (var attr in controllerAttrs)
                    scheme = attr.AuthenticationSchemes ?? defaultScheme;
            }

            var actionAttrs = context.MethodInfo
                .GetCustomAttributes<AuthorizeAttribute>()
                .Where(attr => string.IsNullOrWhiteSpace(attr.Policy));
            foreach (var attr in actionAttrs)
                if (attr.AuthenticationSchemes is null)
                {
                    if (scheme is null) scheme = defaultScheme;
                }
                else
                {
                    scheme = attr.AuthenticationSchemes;
                }

            if (scheme is null) return;
            var requirement = new OpenApiSecurityRequirement();
            foreach (var s in scheme.Split(',').Select(s => s.Trim()))
                requirement.Add(new OpenApiSecuritySchemeReference(s, context.Document), []);
            operation.Security ??= [];
            operation.Security.Add(requirement);
        }
    }

    private class OperationIdFilter : IOperationFilter
    {
        public void Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            operation.OperationId ??=
                $"{context.MethodInfo.DeclaringType?.Name.Replace("Controller", "")}_{context.MethodInfo.Name}";
        }
    }
}
