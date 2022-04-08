using System.Text.Json.Serialization;

namespace Lytical.Artisan.Application.Commands
{
    public class RefreshTokenDto
    {
        public string AccessToken { get; set; }

        [JsonIgnore] // refresh token is returned in http only cookie
        public string RefreshToken { get; set; }
    }
}
