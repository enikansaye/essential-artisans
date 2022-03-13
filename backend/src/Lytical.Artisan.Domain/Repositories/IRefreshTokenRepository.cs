
namespace Lytical.Artisan.Domain.Repositories
{
    public interface IRefreshTokenRepository : IDataAccess, IRepository<RefreshToken>
    {
        Task<RefreshToken> FindbyTokenAsync(string token);
        ValueTask<bool> RemoveAllByUserIdAsync(Guid userId);
    }
}
