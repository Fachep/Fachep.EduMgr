using System.Reflection;
using AutoMapper;
using Fachep.EduMgr.Entities;
using Fachep.EduMgr.WebAPI.Account.Data;
using Fachep.EduMgr.WebAPI.Account.Services;
using Fachep.EduMgr.WebAPI.Common.Data;
using Fachep.EduMgr.WebAPI.Common.Services;
using Fachep.EduMgr.WebAPI.Education.Services;
using Fachep.EduMgr.WebAPI.People.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Fachep.EduMgr.WebAPI;

public static class BusinessExtensions
{
    private static readonly Assembly Assembly = typeof(BusinessExtensions).Assembly;

    extension(IMvcBuilder mvcBuilder)
    {
        public IMvcBuilder AddBusinessApplicationPart()
        {
            return mvcBuilder.AddApplicationPart(Assembly);
        }
    }

    extension(IServiceCollection services)
    {
        public IServiceCollection AddBusinessServices<TContext>()
            where TContext : DbContext
        {
            services.AddScoped<IConfigStore, ConfigStore<TContext>>()
                .AddScoped<IConfigService, ConfigService>();
            services.AddScoped<IAuthService, AuthService<TContext>>()
                .AddScoped<IUserService, UserService<TContext>>();
            services.AddScoped<ITeacherService, TeacherService<TContext>>()
                .AddScoped<IStudentService, StudentService<TContext>>()
                .AddScoped<IClassService, ClassService<TContext>>()
                .AddScoped<IDepartmentService, DepartmentService<TContext>>()
                .AddScoped<IMajorService, MajorService<TContext>>();
            services.AddScoped<ICourseService, CourseService<TContext>>()
                .AddScoped<ISubjectService, SubjectService<TContext>>()
                .AddScoped<IEnrollmentService, EnrollmentService<TContext>>()
                .AddScoped<IScheduleService, ScheduleService<TContext>>()
                .AddScoped<IScheduleService, ScheduleService<TContext>>();
            services.AddIdentityCore<User>(opt =>
                {
                    opt.User.AllowedUserNameCharacters = string.Empty;
                })
                .AddUserStore<UserStore<TContext>>()
                .AddUserManager<AspNetUserManager<User>>()
                .AddSignInManager();
            return services;
        }
    }

    extension(IMapperConfigurationExpression mapperCfg)
    {
        public IMapperConfigurationExpression AddMapperProfiles()
        {
            mapperCfg.AddMaps(Assembly);
            return mapperCfg;
        }
    }
}
