﻿namespace Lytical.Artisan.Domain.Repositories
{
    public interface IUserRepository : IRepository<User>
    {
        ValueTask<bool> UpdateArtisanAsync(Artificer artificer);
        ValueTask<bool> ExistsAsync(string email);
        Task<User> FindbyEmailAsync(string email);
        Task<User> FindByEmailVerificationToken(string token);
        Task<User> FindByRefreshTokenAsync(string token);
        Task<User> FindByPasswordResetTokenAsync(string token);
        Task<Artificer> FindArtisanByIdAsync(int id);
        Task<List<Artificer>> FindArtisansByLocationAsync(string location);
        Task<List<User>> FindAllCustomerAsync();
        Task<List<Artificer>> FindAllArtisanAsync();
    }
}
