namespace Lytical.Artisan.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        public UserRepository(IDbContext context)
        {
            _context = context;
        }
        public async ValueTask<bool> AddAsync(User entity)
        {
            await _context.Users.AddAsync(entity);
            return await _context.CommitAsync();
        }

        public ValueTask<bool> VerifyEmailAsync(string token)
        {
            throw new NotImplementedException();
        }

        public ValueTask<bool> ExistsAsync(string email)
        {
            throw new NotImplementedException();
        }

        public async Task<List<User>> FindAllAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> FindbyEmailAsync(string email)
        {
            return await _context.Users.Where(x => x.Email == email).FirstOrDefaultAsync();
        }

        public async Task<User> FindbyIdAsync(int id)
        {
            return await _context.Users.Where(x => x.UserId == id).FirstOrDefaultAsync();
        }

        public async Task<User> FindbyIdAsync(Guid id)
        {
            return await _context.Users.Where(x => x.Id == id).FirstOrDefaultAsync();
        }

        public async ValueTask<bool> RemoveAsync(User entity)
        {
            _context.Users.Remove(entity);
            return await _context.CommitAsync();
        }

        public async ValueTask<bool> UpdateAsync(User entity)
        {
            _context.Users.Update(entity);
            return await _context.CommitAsync();
        }

        private readonly IDbContext _context;
    }
}
