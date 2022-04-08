using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace Lytical.Artisan.Infrastructure.Services
{
    public class PasswordManager : IPasswordManager
    {
        public string GenerateToken(int length)
        {
            if (length <= 0)
            {
                var salt = new byte[128 / 8];
                using (var rngCsp = RandomNumberGenerator.Create())
                    rngCsp.GetNonZeroBytes(salt);
                return Convert.ToBase64String(salt);
            }
            string saltString = null;
            for (var i = 0; i < length; i++)
            {
                var salt = new byte[128 / 8];
                using (var rngCsp = RandomNumberGenerator.Create())
                    rngCsp.GetNonZeroBytes(salt);
                saltString += Convert.ToBase64String(salt);
            }
            return saltString;
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
        public bool CompareHash(string passwordHash1, string passwordHash2)
        {
            return passwordHash1.Equals(passwordHash2);
        }
    }
}
