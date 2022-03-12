using System.Security.Claims;

namespace Lytical.Artisan.Domain.Services
{
    public interface IAuthTokenManger
    {
        string GenerateAccessToken(User user);
        IEnumerable<Claim> ValidateToken(string token, string secretKey);
        string GenerateRefreshToken();
    }
}
