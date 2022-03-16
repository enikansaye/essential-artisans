namespace Lytical.Artisan.Domain.Repositories
{
    public interface IUserRepository : IDataAccess, IRepository<User>
    {
        ValueTask<bool> ExistsAsync(string email);
        Task<User> FindbyEmailAsync(string email);
        Task<User> VerifyEmailAsync(string token);
        Task<User> FindbyTokenAsync(string token);
    }
}
