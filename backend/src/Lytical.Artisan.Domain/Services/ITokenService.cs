using System.Security.Claims;
using Lytical.Artisan.Domain.Entities;

namespace Lytical.Artisan.Domain.Services
{
    public interface ITokenService
    {
        string GenerateToken(User user);
        IEnumerable<Claim> ValidateToken(string token, string secretKey);
        string GenerateRefreshToken();
    }
}
