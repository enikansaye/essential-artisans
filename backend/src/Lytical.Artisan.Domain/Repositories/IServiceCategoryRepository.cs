namespace Lytical.Artisan.Domain.Repositories
{
    public interface IServiceCategoryRepository : IRepository<ServiceCategory>
    {
        public Task<ServiceCategory> FindByNameAsync(string name)
        {
            throw new NotImplementedException();
        }
        public ValueTask<bool> ExistsAsync(string name)
        {
            throw new NotImplementedException();
        }
        public ValueTask<bool> RemoveAsync(string name)
        {
            throw new NotImplementedException();
        }
    }
}
