namespace Lytical.Artisan.Infrastructure.Repositories
{
    public abstract class Repository<T> : IRepository<T> where T : IEntity
    {

        public async ValueTask<bool> AddAsync(T entity)
        {
            await _context.AddAsync(entity);
            return await _context.CommitAsync();
        }

        public async ValueTask<bool> UpdateAsync(T entity)
        {
            _context.Update(entity);
            return await _context.CommitAsync();
        }

        public abstract ValueTask<bool> RemoveAsync(int id);

        public abstract Task<List<T>> FindAllAsync();

        public abstract Task<T> FindbyIdAsync(int id);

#pragma warning disable CA1051 // Do not declare visible instance fields
#pragma warning disable IDE1006 // Naming Styles
        protected ArtisanDbContext _context;

#pragma warning restore IDE1006 // Naming Styles
#pragma warning restore CA1051 // Do not declare visible instance fields
    }
}
