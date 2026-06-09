using AutoMapper;
using Fachep.EduMgr.Entities;
using Fachep.EduMgr.Infrastructure.Data;
using Fachep.EduMgr.WebAPI.People.Models;
using Fachep.EduMgr.WebAPI.Services;
using Microsoft.EntityFrameworkCore;

namespace Fachep.EduMgr.WebAPI.People.Services;

public class MajorService<TContext>(
    IRepositoryWithContext<TContext, Major, long> repository,
    IMapper mapper,
    IUnitOfWork<TContext> unitOfWork)
    : RestfulService<MajorDto, long, TContext, Major>(repository, mapper, unitOfWork), IMajorService
    where TContext : DbContext
{
}
