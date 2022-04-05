namespace Lytical.Artisan.Domain.Repositories
{
    public interface IRepository<T> where T : IEntity
    {
        ValueTask<bool> AddAsync(T entity);
        ValueTask<bool> UpdateAsync(T entity);
        Task<List<T>> FindAllAsync();
        Task<T> FindbyIdAsync(int id);
    }
}
