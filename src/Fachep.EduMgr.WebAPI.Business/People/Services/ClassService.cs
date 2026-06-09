using AutoMapper;
using Fachep.EduMgr.Entities;
using Fachep.EduMgr.Infrastructure.Data;
using Fachep.EduMgr.WebAPI.People.Models;
using Fachep.EduMgr.WebAPI.Services;
using Microsoft.EntityFrameworkCore;

namespace Fachep.EduMgr.WebAPI.People.Services;

public class ClassService<TContext>(
    IRepositoryWithContext<TContext, Class, long> repository,
    IMapper mapper,
    IUnitOfWork<TContext> unitOfWork)
    : RestfulService<ClassDto, long, TContext, Class>(repository, mapper, unitOfWork), IClassService
    where TContext : DbContext
{
}
