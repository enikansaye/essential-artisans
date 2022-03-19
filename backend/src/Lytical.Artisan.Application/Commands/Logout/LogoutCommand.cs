namespace Lytical.Artisan.Application.Commands
{
    public class LogoutCommand : IRequest
    {
        public LogoutCommand(int id) => UserId = id;
        public Result Validate()
        {
            if (UserId.IsNotValidId())
                return ResultStatus<LoginDto>.Fail(HttpStatusCode.Unauthorized, "User ID is required.");

            return ResultStatus<LoginDto>.Pass(HttpStatusCode.OK);
        }
        public int UserId { get; set; }
    }
}
