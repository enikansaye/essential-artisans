using Lytical.Artisan.Domain.Entities;

namespace Lytical.Artisan.Domain.Data.Repositories
{
    public interface IRepository<T> where T : IEntity
    {
        ValueTask<bool> AddAsync(T entity);
        ValueTask<bool> UpdateAsync(T entity);
        ValueTask<bool> RemoveAsync(T entity);
        Task<IEnumerable<T>> FindAllAsync();
        Task<T> FindbyIdAsync(int id);
        Task<T> FindbyIdAsync(Guid id);
    }
}
