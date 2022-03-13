namespace Lytical.Artisan.Infrastructure.Repositories
{
    public class RefreshTokenRepository : IRefreshTokenRepository
    {
        public ValueTask<bool> AddAsync(RefreshToken entity)
        {
            throw new NotImplementedException();
        }

        public Task<List<RefreshToken>> FindAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<RefreshToken> FindbyIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<RefreshToken> FindbyIdAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<RefreshToken> FindbyTokenAsync(string token)
        {
            throw new NotImplementedException();
        }

        public ValueTask<bool> RemoveAllByUserIdAsync(Guid userId)
        {
            throw new NotImplementedException();
        }

        public ValueTask<bool> RemoveAsync(RefreshToken entity)
        {
            throw new NotImplementedException();
        }

        public ValueTask<bool> UpdateAsync(RefreshToken entity)
        {
            throw new NotImplementedException();
        }
    }
}
