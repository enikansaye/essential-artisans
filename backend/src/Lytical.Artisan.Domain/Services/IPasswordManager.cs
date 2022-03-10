namespace Lytical.Artisan.Domain.Services
{
    public interface IPasswordManager
    {
        string GenerateToken();
        string GetHash(string password, string salt);
        bool CompareHash(string password, string passwordGiven);
    }
}
