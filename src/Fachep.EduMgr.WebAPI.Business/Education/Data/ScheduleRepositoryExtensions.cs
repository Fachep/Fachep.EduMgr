using System.Linq.Expressions;
using Fachep.EduMgr.Entities;
using Fachep.EduMgr.Infrastructure.Data;
using Fachep.EduMgr.WebAPI.Education.Models;
using Microsoft.EntityFrameworkCore;

namespace Fachep.EduMgr.WebAPI.Education.Data;

public static class ScheduleRepositoryExtensions
{
    private static void ApplyQueries(ref IQueryable<Schedule> queryable,
        IEnumerable<KeyValuePair<string[], object?>> queries)
    {
        foreach (var (paths, value) in queries)
        {
            var path = paths[0];
            switch (path)
            {
                case nameof(ScheduleQuery.Week):
                    {
                        if (value is not int week) break;
                        queryable = queryable.Where(s => s.Weeks.Contains(week));
                        break;
                    }
                case nameof(ScheduleQuery.Day):
                    {
                        if (value is not int day) break;
                        queryable = queryable.Where(s => s.Days.Contains(day));
                        break;
                    }
                case nameof(ScheduleQuery.CourseId):
                    {
                        queryable = queryable.Where(s => s.OwnerId == value as long?);
                        break;
                    }
                case nameof(ScheduleQuery.Location):
                    {
                        if (value is string location)
                            queryable = queryable.Where(s =>
                                s.Location != null && s.Location.Contains(location));
                        else queryable = queryable.Where(s => s.Location == null);
                        break;
                    }
            }
        }
    }

    extension(IRepositoryWithContext<DbContext, Schedule, Guid> repository)
    {
        public async Task<List<Schedule>> SelectScheduleListAsync(
            int limit = 0, int offset = 0,
            IEnumerable<(string columnName, bool ascending)>? orderByColumns = null,
            IEnumerable<KeyValuePair<string[], object?>>? queries = null,
            CancellationToken token = default
        )
        {
            token.ThrowIfCancellationRequested();
            var query = repository.Queryable;

            if (orderByColumns is not null)
                foreach (var (columnName, ascending) in orderByColumns)
                {
                    Expression<Func<Schedule, object>> selector = e =>
                        EF.Property<object>(e, columnName);
                    if (query is IOrderedQueryable<Schedule> orderedQueryable)
                        query = ascending
                            ? orderedQueryable.ThenBy(selector)
                            : orderedQueryable.ThenByDescending(selector);
                    else
                        query = ascending
                            ? query.OrderBy(selector)
                            : query.OrderByDescending(selector);
                }

            if (queries is not null)
                ApplyQueries(ref query, queries);

            query = query.Skip(offset);
            if (limit > 0) query = query.Take(limit);

            return await query.ToListAsync(token);
        }

        public async Task<int> CountScheduleAsync(
            IEnumerable<KeyValuePair<string[], object?>>? queries = null,
            CancellationToken token = default)
        {
            var query = repository.Queryable;
            if (queries is not null)
                ApplyQueries(ref query, queries);
            return await query.CountAsync(token);
        }
    }
}
