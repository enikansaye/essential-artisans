namespace Lytical.Artisan.Application.Commands
{
    public class LoginCommand : IRequest<LoginDto>
    {
        public Result<LoginDto> Validate()
        {
            if (Email.IsNotValidEmailString())
                return ResultStatus<LoginDto>.Fail(HttpStatusCode.BadRequest, "A valid email is required.");
            if (Password.IsNotValidString())
                return ResultStatus<LoginDto>.Fail(HttpStatusCode.BadRequest, "Password is required.");

            return ResultStatus<LoginDto>.Pass(HttpStatusCode.OK);
        }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
