using System.Linq.Expressions;

namespace Core.Infrastructure.Repositories;

public interface IAsyncRepository<T> : IQuery<T> where T : Entity
{
    Task<T?> GetAsync(Expression<Func<T, bool>> predicate, CancellationToken ct = default);
    Task<T> AddAsync(T entity, CancellationToken ct = default);
    Task<T> UpdateAsync(T entity, CancellationToken ct = default);
    Task<T> DeleteAsync(T entity, CancellationToken ct = default);
}