using Lytical.Artisan.Domain.Extensions;

namespace Lytical.Artisan.Application.Commands.Register
{
    public class RegisterCommand : ICommand<RegisterUserDto>
    {
        public Result<RegisterUserDto> Validate()
        {
            if (Email.IsNotValidEmailString())
                return ResultStatus<RegisterUserDto>.Fail("A valid email is required.");
            if (Password.IsNotValidString())
                return ResultStatus<RegisterUserDto>.Fail("Password is required.");

            return ResultStatus<RegisterUserDto>.Pass();

        }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
