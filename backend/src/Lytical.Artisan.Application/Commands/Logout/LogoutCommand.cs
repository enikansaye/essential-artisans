namespace Lytical.Artisan.Application.Commands
{
    public class LogoutCommand : ICommand
    {
        public LogoutCommand(Guid id) => UserId = id;
        public Result Validate()
        {
            if (UserId.IsNotValidGuid())
                return ResultStatus<LoginDto>.Fail("A valid email is required.");

            return ResultStatus<LoginDto>.Pass();
        }
        public Guid UserId { get; set; }
    }
}
