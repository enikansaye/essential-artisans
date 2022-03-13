namespace Lytical.Artisan.Application.Commands
{
    public class LogoutCommand : ICommand
    {
        public LogoutCommand(Guid id) => UserId = id;
        public Result Validate()
        {
            if (UserId.IsNotValidGuid())
                return ResultStatus<LoginDto>.Fail(HttpStatusCode.Unauthorized, "A valid email is required.");

            return ResultStatus<LoginDto>.Pass(HttpStatusCode.OK);
        }
        public Guid UserId { get; set; }
    }
}
