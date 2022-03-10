using Lytical.Artisan.Domain.Entities;

namespace Lytical.Artisan.Domain.Repositories
{
    public interface IRepository<T> where T : IEntity
    {
        ValueTask<Result<bool>> AddAsync(T entity);
        ValueTask<Result<bool>> UpdateAsync(T entity);
        ValueTask<Result<bool>> RemoveAsync(T entity);
        Task<List<T>> FindAllAsync();
        Task<T> FindbyIdAsync(int id);
        Task<T> FindbyIdAsync(Guid id);
    }
}
