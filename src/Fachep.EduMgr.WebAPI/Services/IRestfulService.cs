using Fachep.EduMgr.WebAPI.Models;

namespace Fachep.EduMgr.WebAPI.Services;

public interface IRestfulService<TDto, TKey> : IRestfulService<TDto>
    where TKey : struct, IEquatable<TKey>
{
    Task<TDto?> GetAsync(TKey id, CancellationToken token = default);
    Task<TKey> CreateAndGetKeyAsync(TDto dto, CancellationToken token = default);
    Task CreateAsync(TKey id, TDto dto, CancellationToken token = default);
    Task DeleteAsync(TKey id, CancellationToken token = default);
    Task<List<TDto>> GetRangeAsync(IEnumerable<TKey> ids, CancellationToken token = default);
}

public interface IRestfulService<TDto>
{
    Task<int> CountAsync(IEnumerable<KeyValuePair<string[], object?>>? queries = null,
        CancellationToken token = default);

    Task<List<TDto>> PageAsync(int limit = 0, int offset = 0,
        IEnumerable<OrderByColumn>? orderBys = null,
        IEnumerable<KeyValuePair<string[], object?>>? queries = null,
        CancellationToken token = default);

    Task UpdateAsync(TDto dto, CancellationToken token = default);
    Task DeleteAsync(TDto dto, CancellationToken token = default);
    Task CreateAsync(TDto dto, CancellationToken token = default);
}
