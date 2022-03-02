using Lytical.Artisan.Domain.Data.Repositories;

namespace Lytical.Artisan.Domain.Data.Context
{
    public interface IAccountDbContext
    {
        public IUserRepository UserRepository { get; }
        public IRefreshTokenRepository RefreshTokenRepository { get; }
    }
}
