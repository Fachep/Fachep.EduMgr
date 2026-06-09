using AutoMapper;
using Fachep.EduMgr.Entities;
using Fachep.EduMgr.Infrastructure.Data;
using Fachep.EduMgr.WebAPI.Education.Models;
using Fachep.EduMgr.WebAPI.Services;
using Microsoft.EntityFrameworkCore;

namespace Fachep.EduMgr.WebAPI.Education.Services;

public class SubjectService<TContext>(
    IRepositoryWithContext<TContext, Subject, long> repository,
    IMapper mapper,
    IUnitOfWork<TContext> unitOfWork)
    : RestfulService<SubjectDto, long, TContext, Subject>(repository, mapper, unitOfWork),
        ISubjectService
    where TContext : DbContext
{
}
