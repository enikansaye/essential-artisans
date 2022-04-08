using Lytical.Artisan.Domain.Exceptions;
using Microsoft.Extensions.Configuration;

namespace Lytical.Artisan.Infrastructure
{
    public class ArtisanDbContext : DbContext
    {
        public ArtisanDbContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseLazyLoadingProxies();
                optionsBuilder.UseSqlServer(_configuration.GetConnectionString("ArtisanDatabase"));
            }
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           // modelBuilder.ApplyConfiguration(new UserConfiguration());
        }
        public async Task<bool> CommitAsync()
        {
            if (await SaveChangesAsync() < 0)
                throw new ArtisanException(ErrorCode.ErrorWhileSavingToDatabase, "Cannot save changes in db.");
            return true;
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Artificer> Artisans { get; set; }
        public DbSet<ServiceOrder> Orders { get; set; }
        public DbSet<ServiceCategory> ServiceCategories { get; set; }

        private readonly IConfiguration _configuration;
    }
}
