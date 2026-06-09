using AutoMapper;
using Fachep.EduMgr.WebAPI.Configurations;
using Fachep.EduMgr.WebAPI.Conventions;
using Fachep.EduMgr.WebAPI.Filters;
using Fachep.EduMgr.WebAPI.Models;
using Fachep.EduMgr.WebAPI.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Fachep.EduMgr.WebAPI;

public static class Extensions
{
    extension<TSource, TDestination>(IMappingExpression<TSource, TDestination> map)
        where TSource : IQueryBase
    {
        public IMappingExpression<TSource, TDestination> IgnoreNotSetProperties()
        {
            map.ForAllMembers(m => m.PreCondition(s => s.IsSet(m.DestinationMember.Name)));
            return map;
        }
    }

    extension(IServiceCollection services)
    {
        public CoreServicesBuilder AddCoreServices()
        {
            services.AddAuthorization();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer()
                .AddJwtBearer("Refresh");
            services
                .AddSingleton<IJwtService, JwtService>()
                .Configure<JwtOptions>(_ => { });
            services
                .AddSingleton<IConfigureOptions<SwaggerGenOptions>,
                    SwaggerGenOptionsConfiguration>();
            services
                .AddTransient<IConfigureOptions<MvcOptions>,
                    ExcludeControllersMvcOptionsConfiguration>()
                .AddTransient<ExcludeControllersConvention>()
                .Configure<ExcludeControllersConvention>(_ => { });
            services.Configure<MvcOptions>(opts =>
            {
                opts.Filters.Add<NotFoundExceptionFilter>();
            });
            return new CoreServicesBuilder(services);
        }
    }

    public class CoreServicesBuilder(IServiceCollection services)
    {
        public CoreServicesBuilder ConfigureExcludeControllers(
            Action<ExcludeControllersOptions> action)
        {
            services.Configure(action);
            return this;
        }

        public CoreServicesBuilder ConfigureExcludeControllers(IConfiguration configuration)
        {
            services.Configure<ExcludeControllersOptions>(configuration);
            return this;
        }

        public CoreServicesBuilder ConfigureJwt(Action<JwtOptions> action)
        {
            services.Configure(action);
            return this;
        }

        public CoreServicesBuilder ConfigureJwt(IConfiguration configuration)
        {
            services.Configure<JwtOptions>(configuration);
            return this;
        }
    }
}
