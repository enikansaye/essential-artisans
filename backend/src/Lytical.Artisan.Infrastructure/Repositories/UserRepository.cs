﻿namespace Lytical.Artisan.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        public UserRepository(IDbContext context)
        {
            _context = context;
        }
        public async ValueTask<bool> AddAsync(User entity)
        {
            //await _context.Users.AddAsync(entity);
            //return await _context.CommitAsync();
            await Task.Delay(1000);
            FakeDatabase.Users.Add(entity);
            return true;
        }
        public async Task<User> FindbyTokenAsync(string token)
        {
            await Task.Delay(1000);

            return FakeDatabase.Users.Where(x => x.RefreshToken == token).FirstOrDefault();
        }
        public async Task<User> VerifyEmailAsync(string token)
        {
            await Task.Delay(1000);
            return FakeDatabase.Users.FirstOrDefault(x => x.EmailVerificationToken == token);
        }

        public async ValueTask<bool> ExistsAsync(string email)
        {
            await Task.Delay(1000);
            var result = FakeDatabase.Users.Any(x => x.Email.ToUpper() == email.ToUpper());
            return true;
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
            return FakeDatabase.Users.Where(x => x.Email.ToUpper() == email.ToUpper()).FirstOrDefault();
        }

        public async Task<User> FindbyIdAsync(int id)
        {
            // return await _context.Users.Where(x => x.UserId == id).FirstOrDefaultAsync();
            await Task.Delay(1000);
            return FakeDatabase.Users.Where(x => x.Id == id).FirstOrDefault();
        }
        public async ValueTask<bool> RemoveAsync(User entity)
        {
            //_context.Users.Remove(entity);
            //return await _context.CommitAsync();
            await Task.Delay(1000);

            var user = FakeDatabase.Users.Where(x => x.Email.ToUpper() == entity.Email.ToUpper()).FirstOrDefault();
            FakeDatabase.Users.Remove(user);
            return true;
        }

        public async ValueTask<bool> UpdateAsync(User entity)
        {
            //_context.Users.Update(entity);
            //return await _context.CommitAsync();
            await Task.Delay(1000);
            var user = FakeDatabase.Users.Where(x => x.Email.ToUpper() == entity.Email.ToUpper()).FirstOrDefault();
            user.FirstName = entity.FirstName;
            user.LastName = entity.LastName;
            return true;
        }

        public async Task<Domain.Entities.Artificer> FindArtisanByIdAsync(int id)
        {
            // return await _context.Users.Where(x => x.UserId == id).FirstOrDefaultAsync();
            await Task.Delay(1000);
            return FakeDatabase.Artisans.Where(x => x.Id == id).FirstOrDefault();
        }

        public async ValueTask<bool> AddAsync(Artificer artificer)
        {
            await Task.Delay(1000);
            FakeDatabase.Artisans.Add(artificer);
            return true;
        }

        public async Task<List<Artificer>> FindAllArtisanAsync()
        {
            await Task.Delay(1000);

            return FakeDatabase.Artisans.Where(x => x.AccountType == Domain.Enums.AccountType.ARTISAN).ToList();
        }

        public async Task<List<User>> FindAllCustomerAsync()
        {

            await Task.Delay(1000);

            return FakeDatabase.Users.Where(x => x.AccountType == Domain.Enums.AccountType.CUSTOMER).ToList();
        }

        private readonly IDbContext _context;
    }
}
