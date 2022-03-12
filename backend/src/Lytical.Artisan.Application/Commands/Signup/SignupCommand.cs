namespace Lytical.Artisan.Application.Commands
{
    public class SignupCommand : ICommand<SignupDto>
    {
        public Result<SignupDto> Validate()
        {
            if (Email.IsNotValidEmailString())
                return ResultStatus<SignupDto>.Fail("A valid email is required.");
            if (Password.IsNotValidString())
                return ResultStatus<SignupDto>.Fail("Password is required.");

            return ResultStatus<SignupDto>.Pass();

        }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
