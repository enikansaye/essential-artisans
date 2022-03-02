using System.Security.Claims;
using Lytical.Artisan.Domain.Entities;
using Lytical.Artisan.Domain.Services;
using Lytical.Artisan.Domain.Settings;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace Lytical.Artisan.Infrastructure.Services
{
    public class JwtService : ITokenService
    {
        public JwtService(JwtSettings settings) => _settings = settings;
        public string GenerateToken(User user)
        {
            List<Claim> claims = new()
            {
                new Claim(ClaimTypes.PrimarySid, user.Id.ToString()),
                new Claim(ClaimTypes.SerialNumber, user.UserId.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.UserType.ToString()),
                new Claim(ClaimTypes.GivenName, user.FirstName),
                new Claim(ClaimTypes.Surname, user.LastName),
                new Claim(ClaimTypes.MobilePhone, user.PhoneNumber),
            };

            return CreateToken(_settings.SecretKey, _settings.Expiration, claims);
        }

        public string GenerateRefreshToken()
        {
            return CreateToken(_settings.RefreshKey, _settings.RefreshExpiration);
        }

        public IEnumerable<Claim> ValidateToken(string token, string secretKey)
        {
            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                RequireExpirationTime = true,
                ClockSkew = TimeSpan.Zero,
                ValidIssuer = _settings.Issuer,
                ValidAudience = _settings.Audience,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
            };
            JwtSecurityTokenHandler tokenHandler = new();
            try
            {
                tokenHandler.ValidateToken(token, validationParameters, out var validatedToken);

                return ((JwtSecurityToken)validatedToken).Claims;
            }
            catch (Exception)
            {

                return Array.Empty<Claim>();
            }
        }

        private string CreateToken(string secretKey, double expirationMinutes, IEnumerable<Claim> claims = null)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var encryptkey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_settings.EncryptingKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var encryption = new EncryptingCredentials(encryptkey, SecurityAlgorithms.Aes128KW, SecurityAlgorithms.Aes128CbcHmacSha256);

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateJwtSecurityToken(new SecurityTokenDescriptor
            {
                Audience = _settings.Audience,
                Issuer = _settings.Issuer,
                NotBefore = DateTime.UtcNow,
                Expires = DateTime.UtcNow.AddMinutes(expirationMinutes),
                Subject = new ClaimsIdentity(claims),
                SigningCredentials = creds,
                EncryptingCredentials = encryption
            });
            return tokenHandler.WriteToken(token);
        }
        private readonly JwtSettings _settings;
    }
}
