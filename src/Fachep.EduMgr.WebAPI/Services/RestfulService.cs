using AutoMapper;
using Fachep.EduMgr.Infrastructure.Data;
using Fachep.EduMgr.WebAPI.Exceptions;
using Fachep.EduMgr.WebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace Fachep.EduMgr.WebAPI.Services;

public abstract class RestfulService<TDto, TContext, TEntity>(
    IRepositoryWithContext<TContext, TEntity> repository,
    IMapper mapper,
    IUnitOfWork<TContext> unitOfWork) : IRestfulService<TDto> where TContext : DbContext
    where TEntity : class, IEntity
{
    protected IRepositoryWithContext<TContext, TEntity> Repository { get; } = repository;
    protected IMapper Mapper { get; } = mapper;
    protected IUnitOfWork<TContext> UnitOfWork { get; } = unitOfWork;

    public virtual async Task<int> CountAsync(
        IEnumerable<KeyValuePair<string[], object?>>? queries = null,
        CancellationToken token = default)
    {
        token.ThrowIfCancellationRequested();
        return await Repository.CountAsync(queries, token);
    }

    public virtual async Task<List<TDto>> PageAsync(int limit = 0, int offset = 0,
        IEnumerable<OrderByColumn>? orderBys = null,
        IEnumerable<KeyValuePair<string[], object?>>? queries = null,
        CancellationToken token = default)
    {
        token.ThrowIfCancellationRequested();
        var list = await Repository.SelectListAsync(
            limit, offset,
            Mapper.Map<IEnumerable<(string, bool)>?>(orderBys),
            queries,
            token
        );
        return Mapper.Map<List<TEntity>, List<TDto>>(list);
    }

    public abstract Task UpdateAsync(TDto dto, CancellationToken token = default);
    public abstract Task DeleteAsync(TDto dto, CancellationToken token = default);
    public abstract Task CreateAsync(TDto dto, CancellationToken token = default);
}

public abstract class RestfulService<TDto, TKey, TContext, TEntity>(
    IRepositoryWithContext<TContext, TEntity, TKey> repository,
    IMapper mapper,
    IUnitOfWork<TContext> unitOfWork)
    : RestfulService<TDto, TContext, TEntity>(repository, mapper, unitOfWork),
        IRestfulService<TDto, TKey>
    where TContext : DbContext
    where TEntity : class, IEntity<TKey>
    where TKey : struct, IEquatable<TKey>
{
    protected new IRepositoryWithContext<TContext, TEntity, TKey> Repository { get; } = repository;


    public virtual async Task<TDto?> GetAsync(TKey id, CancellationToken token = default)
    {
        token.ThrowIfCancellationRequested();
        return Mapper.Map<TEntity?, TDto?>(await Repository.SelectFirstByIdAsync(id, token));
    }

    public override async Task UpdateAsync(TDto dto, CancellationToken token = default)
    {
        token.ThrowIfCancellationRequested();
        ArgumentNullException.ThrowIfNull(dto);
        var id = Mapper.Map<TDto, TEntity>(dto).Id;
        var entity = await Repository.SelectFirstByIdAsync(id, token);
        if (entity == null) throw new EntityNotFoundException(id);
        Mapper.Map(dto, entity);
        await Repository.UpdateAsync(entity, token);
        await UnitOfWork.SaveChangesAsync(token);
    }

    public virtual async Task DeleteAsync(TKey id, CancellationToken token = default)
    {
        token.ThrowIfCancellationRequested();
        await Repository.RemoveByIdAsync(id, token);
        await UnitOfWork.SaveChangesAsync(token);
    }

    public override Task DeleteAsync(TDto dto, CancellationToken token = default)
    {
        token.ThrowIfCancellationRequested();
        ArgumentNullException.ThrowIfNull(dto);
        var id = Mapper.Map<TDto, TEntity>(dto).Id;
        return DeleteAsync(id, token);
    }

    public override Task CreateAsync(TDto dto, CancellationToken token = default)
    {
        return CreateAndGetKeyAsync(dto, token);
    }

    public virtual async Task<TKey> CreateAndGetKeyAsync(TDto dto,
        CancellationToken token = default)
    {
        token.ThrowIfCancellationRequested();
        ArgumentNullException.ThrowIfNull(dto);
        var entity = Mapper.Map<TDto, TEntity>(dto);
        await Repository.AddAsync(entity, token);
        await UnitOfWork.SaveChangesAsync(token);
        return entity.Id;
    }

    public virtual async Task CreateAsync(TKey id, TDto dto, CancellationToken token = default)
    {
        token.ThrowIfCancellationRequested();
        ArgumentNullException.ThrowIfNull(dto);
        if (id.Equals(default)) throw new ArgumentOutOfRangeException(nameof(id));
        var entity = Mapper.Map<TDto, TEntity>(dto);
        Mapper.Map(new { Id = id }, entity);
        await Repository.AddAsync(entity, token);
        await UnitOfWork.SaveChangesAsync(token);
    }

    public virtual async Task<List<TDto>> GetRangeAsync(IEnumerable<TKey> ids,
        CancellationToken token = default)
    {
        token.ThrowIfCancellationRequested();
        var list = await Repository.SelectListByIdRangeAsync(ids, token);
        return Mapper.Map<List<TEntity>, List<TDto>>(list);
    }
}
