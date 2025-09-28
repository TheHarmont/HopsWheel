namespace Core.Infrastructure.Repositories;
public interface IQuery<T>
{
    IQueryable<T> Query();
}
