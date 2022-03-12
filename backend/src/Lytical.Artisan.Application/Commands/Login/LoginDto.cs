using System.Text.Json.Serialization;
using Lytical.Artisan.Domain.Enums;

namespace Lytical.Artisan.Application.Commands
{
    public class LoginDto
    {
        public int Id { get; set; }
        public Guid UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public UserType UserType { get; set; }
        public string AccessToken { get; set; }

        [JsonIgnore] // refresh token is returned in http only cookie
        public string RefreshToken { get; set; }
    }
}
