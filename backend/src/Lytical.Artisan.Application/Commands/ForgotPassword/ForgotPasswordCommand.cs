namespace Lytical.Artisan.Application.Commands
{
    public class ForgotPasswordCommand : IRequest
    {
        public Result Validate()
        {
            if (Email.IsNotValidEmailString())
                return ResultStatus.Fail(HttpStatusCode.BadRequest, "A valid email is required.");
            return ResultStatus.Pass(HttpStatusCode.OK);

        }
        public string Email { get; set; }
    }
}
