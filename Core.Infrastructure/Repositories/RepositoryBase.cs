using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Core.Infrastructure.Repositories;
public class RepositoryBase<TEntity, TContext> : IAsyncRepository<TEntity>
    where TEntity : Entity
    where TContext : DbContext
{
    protected TContext Context { get; }

    public RepositoryBase(TContext context)
    {
        Context = context;
    }

    public async Task<TEntity?> GetAsync(Expression<Func<TEntity, bool>> predicate, CancellationToken ct = default)
    {
        return await Context.Set<TEntity>().FirstOrDefaultAsync(predicate, ct);
    }

    public async Task<TEntity> AddAsync(TEntity entity, CancellationToken ct = default)
    {
        Context.Entry(entity).State = EntityState.Added;
        await Context.SaveChangesAsync(ct);
        return entity;
    }

    public async Task<TEntity> UpdateAsync(TEntity entity, CancellationToken ct = default)
    {
        Context.Entry(entity).State = EntityState.Modified;
        await Context.SaveChangesAsync(ct);
        return entity;
    }

    public async Task<TEntity> DeleteAsync(TEntity entity, CancellationToken ct = default)
    {
        Context.Entry(entity).State = EntityState.Deleted;
        await Context.SaveChangesAsync(ct);
        return entity;
    }

    public IQueryable<TEntity> Query()
    {
        return Context.Set<TEntity>();
    }
}
