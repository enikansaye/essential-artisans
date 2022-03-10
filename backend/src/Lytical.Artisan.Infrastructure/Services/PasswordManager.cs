using System.Security.Cryptography;
using Lytical.Artisan.Domain.Extensions;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace Lytical.Artisan.Infrastructure.Services
{
    public class PasswordManager : IPasswordManager
    {
        public string GenerateToken()
        {
            var salt = new byte[128 / 8];
            using (var rngCsp = RandomNumberGenerator.Create())
                rngCsp.GetNonZeroBytes(salt);
            return Convert.ToBase64String(salt);
        }
        public string GetHash(string password, string salt)
        {
            return Convert.ToBase64String(KeyDerivation.Pbkdf2(
                   password: password,
                   salt: Convert.FromBase64String(salt),
                   prf: KeyDerivationPrf.HMACSHA256,
                   iterationCount: 100000,
                   numBytesRequested: 256 / 8));
        }
        public bool CompareHash(string password, string passwordGiven)
        {
            if (password.IsValidString() || passwordGiven.IsValidString())
                return password.Equals(passwordGiven);
            return false;
        }
    }
}
