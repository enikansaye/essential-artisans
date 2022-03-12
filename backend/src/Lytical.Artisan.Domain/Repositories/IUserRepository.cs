using Lytical.Artisan.Domain.Abstractions;
using Lytical.Artisan.Domain.Entities;

namespace Lytical.Artisan.Domain.Repositories
{
    public interface IUserRepository : IDataAccess, IRepository<User>
    {
        ValueTask<Result<bool>> ExistsAsync(string email);
        Task<User> FindbyEmailAsync(string email);
        Task<User> VerifyEmailAsync(string token);
    }
}
