using Lytical.Artisan.Domain.Entities;

namespace Lytical.Artisan.Domain.Data.Repositories
{
    public interface IUserRepository : IRepository<User>
    {
        ValueTask<bool> ExistsAsync(string email);
        Task<User> FindbyEmailAsync(string email);
        ValueTask<bool> ConfirmedEmailAsync(string email);
        Task<User> UpdateEmailConfirmationAsync(User entity);
        Task<User> UpdatePasswordAsync(User entity);
    }
}
