namespace Lytical.Artisan.Application.Commands
{
    public class ResetPasswordCommand : IRequest
    {
        public Result Validate()
        {
            if (ConfirmPassword.IsNotValidString())
                return ResultStatus.Fail(HttpStatusCode.BadRequest, "Confirm password is required.");
            if (Password.IsNotValidString())
                return ResultStatus.Fail(HttpStatusCode.BadRequest, "Password is required.");
            if (Password.Equals(ConfirmPassword))
                return ResultStatus.Fail(HttpStatusCode.BadRequest, "Password and Confirm Password must match.");
            if (Token.IsNotValidString())
                return ResultStatus.Fail(HttpStatusCode.BadRequest, "Invalid Token.");

            return ResultStatus<LoginDto>.Pass(HttpStatusCode.OK);

        }
        public string ConfirmPassword { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }
    }
}
