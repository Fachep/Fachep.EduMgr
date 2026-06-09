using AutoMapper;
using Fachep.EduMgr.Entities;
using Fachep.EduMgr.Infrastructure.Data;
using Fachep.EduMgr.WebAPI.Education.Data;
using Fachep.EduMgr.WebAPI.Education.Models;
using Fachep.EduMgr.WebAPI.Models;
using Fachep.EduMgr.WebAPI.Services;
using Microsoft.EntityFrameworkCore;

namespace Fachep.EduMgr.WebAPI.Education.Services;

public class ScheduleService<TContext>(
    IRepositoryWithContext<TContext, Schedule, Guid> repository,
    IMapper mapper,
    IUnitOfWork<TContext> unitOfWork)
    : RestfulService<ScheduleDto, Guid, TContext, Schedule>(repository, mapper, unitOfWork),
        IScheduleService
    where TContext : DbContext
{
    public override async Task<List<ScheduleDto>> PageAsync(int limit = 0, int offset = 0,
        IEnumerable<OrderByColumn>? orderBys = null,
        IEnumerable<KeyValuePair<string[], object?>>? queries = null,
        CancellationToken token = default)
    {
        token.ThrowIfCancellationRequested();
        var list = await repository.SelectScheduleListAsync(
            limit, offset,
            Mapper.Map<IEnumerable<(string, bool)>?>(orderBys),
            queries, token
        );
        return Mapper.Map<List<Schedule>, List<ScheduleDto>>(list);
    }

    public override Task<int> CountAsync(
        IEnumerable<KeyValuePair<string[], object?>>? queries = null,
        CancellationToken token = default)
    {
        token.ThrowIfCancellationRequested();
        return repository.CountScheduleAsync(queries, token);
    }
}
