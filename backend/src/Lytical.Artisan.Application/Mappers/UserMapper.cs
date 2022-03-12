using Lytical.Artisan.Application.Commands;

namespace Lytical.Artisan.Application.Mappers
{
    public static class UserMapper
    {
        public static SignupDto MapEmailDto(this User user)
        {
            return new SignupDto
            {
                Email = user.Email,
                Status = "Registration successful. Please your email for account activation token."
            };
        }

    }
}
