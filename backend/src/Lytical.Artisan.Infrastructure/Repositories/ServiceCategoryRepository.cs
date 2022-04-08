namespace Lytical.Artisan.Infrastructure.Repositories
{
    public class ServiceCategoryRepository : Repository<ServiceCategory>, IServiceCategoryRepository
    {
        public ServiceCategoryRepository(ArtisanDbContext context) => _context = context;

        public override async Task<List<ServiceCategory>> FindAllAsync()
        {
            return await _context.ServiceCategories.ToListAsync();
        }

        public override async Task<ServiceCategory> FindbyIdAsync(int id)
        {
            return await _context.ServiceCategories.FindAsync(id);
        }

        public override async ValueTask<bool> RemoveAsync(int id)
        {
            _context.ServiceCategories.Remove(ServiceCategory.New(id));
            return await _context.CommitAsync();
        }
    }
}
