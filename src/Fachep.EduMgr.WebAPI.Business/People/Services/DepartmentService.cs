using AutoMapper;
using Fachep.EduMgr.Entities;
using Fachep.EduMgr.Infrastructure.Data;
using Fachep.EduMgr.WebAPI.People.Models;
using Fachep.EduMgr.WebAPI.Services;
using Microsoft.EntityFrameworkCore;

namespace Fachep.EduMgr.WebAPI.People.Services;

public class DepartmentService<TContext>(
    IRepositoryWithContext<TContext, Department, long> repository,
    IMapper mapper,
    IUnitOfWork<TContext> unitOfWork)
    : RestfulService<DepartmentDto, long, TContext, Department>(repository, mapper, unitOfWork),
        IDepartmentService
    where TContext : DbContext
{
}
