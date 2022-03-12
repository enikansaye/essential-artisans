namespace Lytical.Artisan.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        public UserRepository(IDbContext context)
        {
            _context = context;
        }
        public async ValueTask<Result<bool>> AddAsync(User entity)
        {
            //await _context.Users.AddAsync(entity);
            //return await _context.CommitAsync();
            await Task.Delay(1000);
            FakeDatabase.Users.Add(entity);
            return ResultStatus<bool>.Pass();
        }

        public async Task<User> VerifyEmailAsync(string token)
        {
            await Task.Delay(1000);
            return FakeDatabase.Users.FirstOrDefault(x => x.VerificationToken == token);
        }

        public async ValueTask<Result<bool>> ExistsAsync(string email)
        {
            await Task.Delay(1000);
            var result = FakeDatabase.Users.Any(x => x.NormalizedEmail == email.ToUpper());
            return ResultStatus<bool>.Pass(result);
        }

        public async Task<List<User>> FindAllAsync()
        {
            //return await _context.Users.ToListAsync();
            await Task.Delay(1000);
            return FakeDatabase.Users;
        }

        public async Task<User> FindbyEmailAsync(string email)
        {
            //return await _context.Users.Where(x => x.Email == email).FirstOrDefaultAsync();
            await Task.Delay(1000);
            return FakeDatabase.Users.Where(x => x.NormalizedEmail == email.ToUpper()).FirstOrDefault();
        }

        public async Task<User> FindbyIdAsync(int id)
        {
            // return await _context.Users.Where(x => x.UserId == id).FirstOrDefaultAsync();
            await Task.Delay(1000);
            return FakeDatabase.Users.Where(x => x.UserId == id).FirstOrDefault();
        }

        public async Task<User> FindbyIdAsync(Guid id)
        {
            // return await _context.Users.Where(x => x.Id == id).FirstOrDefaultAsync();
            await Task.Delay(1000);
            return FakeDatabase.Users.Where(x => x.Id == id).FirstOrDefault();
        }

        public async ValueTask<Result<bool>> RemoveAsync(User entity)
        {
            //_context.Users.Remove(entity);
            //return await _context.CommitAsync();
            await Task.Delay(1000);

            var user = FakeDatabase.Users.Where(x => x.NormalizedEmail == entity.Email.ToUpper()).FirstOrDefault();
            FakeDatabase.Users.Remove(user);
            return ResultStatus<bool>.Pass();
        }

        public async ValueTask<Result<bool>> UpdateAsync(User entity)
        {
            //_context.Users.Update(entity);
            //return await _context.CommitAsync();
            await Task.Delay(1000);
            var user = FakeDatabase.Users.Where(x => x.NormalizedEmail == entity.Email.ToUpper()).FirstOrDefault();
            user.FirstName = entity.FirstName;
            user.LastName = entity.LastName;
            return ResultStatus<bool>.Pass();
        }

        private readonly IDbContext _context;
    }
}
