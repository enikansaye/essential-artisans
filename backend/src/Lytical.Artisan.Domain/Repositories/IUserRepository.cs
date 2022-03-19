namespace Lytical.Artisan.Domain.Repositories
{
    public interface IUserRepository : IDataAccess, IRepository<User>
    {
        ValueTask<bool> AddAsync(Artificer artificer);
        ValueTask<bool> ExistsAsync(string email);
        Task<User> FindbyEmailAsync(string email);
        Task<User> VerifyEmailAsync(string token);
        Task<User> FindbyTokenAsync(string token);
        Task<Artificer> FindArtisanByIdAsync(int id);
        Task<List<Artificer>> FindAllArtisanAsync();
    }
}
