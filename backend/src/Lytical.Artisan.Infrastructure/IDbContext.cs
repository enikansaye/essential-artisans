namespace Lytical.Artisan.Infrastructure
{
    public interface IDbContext : IDisposable
    {
        DbSet<User> Users { get; set; }

        Task<bool> CommitAsync();
        DbSet<TEntity> Set<TEntity>() where TEntity : class;

        bool EnsureDatabaseCreated();
    }
}
