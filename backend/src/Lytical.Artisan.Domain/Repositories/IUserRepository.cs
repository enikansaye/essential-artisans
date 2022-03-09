using Lytical.Artisan.Domain.Entities;

namespace Lytical.Artisan.Domain.Repositories
{
    public interface IUserRepository : IRepository<User>
    {
        ValueTask<bool> ExistsAsync(string email);
        Task<User> FindbyEmailAsync(string email);
        ValueTask<bool> VerifyEmailAsync(string token);
    }
}
