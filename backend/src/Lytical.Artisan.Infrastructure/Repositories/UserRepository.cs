namespace Lytical.Artisan.Infrastructure.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(ArtisanDbContext context) => _context = context;
        public async Task<User> FindByRefreshTokenAsync(string token)
        {
            return await _context.Users.Where(x => x.RefreshToken == token).FirstOrDefaultAsync();
        }
        public async Task<User> FindByEmailVerificationToken(string token)
        {
            return await _context.Users.Where(x => x.EmailVerificationToken == token).FirstOrDefaultAsync();
        }

        public async ValueTask<bool> ExistsAsync(string email)
        {
            return await _context.Users.AnyAsync(x => x.Email.ToUpper() == email.ToUpper());
        }

        public override async Task<List<User>> FindAllAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> FindbyEmailAsync(string email)
        {
            return await _context.Users.Where(x => x.Email.ToUpper() == email.ToUpper()).FirstOrDefaultAsync();
        }

        public override async Task<User> FindbyIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }
        public override async ValueTask<bool> RemoveAsync(int id)
        {
            _context.Users.Remove(User.New(id));
            return await _context.CommitAsync();
        }

        public async ValueTask<bool> UpdateArtisanAsync(Artificer artificer)
        {
            _context.Artisans.Update(artificer);
            return await _context.CommitAsync();
        }

        public async Task<Artificer> FindArtisanByIdAsync(int id)
        {
            return await _context.Artisans.FindAsync(id);
        }
        public async Task<List<Artificer>> FindAllArtisanAsync()
        {
            return await _context.Artisans.ToListAsync();
        }

        public async Task<List<User>> FindAllCustomerAsync()
        {
            return await _context.Users.Where(x => x.AccountType == AccountType.CUSTOMER).ToListAsync();
        }

        public async Task<User> FindByPasswordResetTokenAsync(string token)
        {
            return await _context.Users.Where(x => x.PasswordResetToken == token).FirstOrDefaultAsync();
        }

        public async Task<List<Artificer>> FindArtisansByLocationAsync(string location)
        {
            return await _context.Artisans.Where(x => x.Location.ToLower() == location.ToLower()).ToListAsync();
        }
    }
}
