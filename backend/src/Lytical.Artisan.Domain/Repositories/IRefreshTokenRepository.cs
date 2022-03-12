
namespace Lytical.Artisan.Domain.Repositories
{
    public interface IRefreshTokenRepository : IDataAccess, IRepository<RefreshToken>
    {
        Task<RefreshToken> FindbyTokenAsync(string token);
        ValueTask<Result<bool>> RemoveAllByUserIdAsync(Guid userId);
    }
}
