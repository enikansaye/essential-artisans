namespace Lytical.Artisan.Domain.Services
{
    public interface IPasswordManager
    {
        string GenerateToken(int length);
        string GetHash(string password, string salt);
        bool CompareHash(string passwordHash1, string passwordHash2);
    }
}
