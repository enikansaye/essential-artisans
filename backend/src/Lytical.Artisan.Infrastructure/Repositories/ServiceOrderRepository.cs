namespace Lytical.Artisan.Infrastructure.Repositories
{
    public class ServiceOrderRepository : Repository<ServiceOrder>, IServiceOrderRepository
    {
        public ServiceOrderRepository(ArtisanDbContext context) => _context = context;

        public override async Task<List<ServiceOrder>> FindAllAsync()
        {
            return await _context.Orders.ToListAsync();
        }

        public override async Task<ServiceOrder> FindbyIdAsync(int id)
        {
            return await _context.Orders.FindAsync(id);
        }

        public override async ValueTask<bool> RemoveAsync(int id)
        {
            _context.Orders.Remove(ServiceOrder.New(id));
            return await _context.CommitAsync();
        }
    }
}
