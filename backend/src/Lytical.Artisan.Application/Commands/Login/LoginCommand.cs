namespace Lytical.Artisan.Application.Commands
{
    public class LoginCommand : ICommand<LoginDto>
    {
        public Result<LoginDto> Validate()
        {
            if (Email.IsNotValidEmailString())
                return ResultStatus<LoginDto>.Fail("A valid email is required.");
            if (Password.IsNotValidString())
                return ResultStatus<LoginDto>.Fail("Password is required.");

            return ResultStatus<LoginDto>.Pass();

        }
        public string Email { get; set; }
        public string IpAddress { get; set; }
        public string Password { get; set; }
    }
}
