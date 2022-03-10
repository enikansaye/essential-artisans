using Lytical.Artisan.Domain.Entities;
using Lytical.Artisan.Application.Commands.Register;

namespace Lytical.Artisan.Application.Mappers
{
    public static class UserMapper
    {
        public static RegisterUserDto MapEmailDto(this User user)
        {
            return new RegisterUserDto
            {
                Email = user.Email,
            };
        }

    }
}
