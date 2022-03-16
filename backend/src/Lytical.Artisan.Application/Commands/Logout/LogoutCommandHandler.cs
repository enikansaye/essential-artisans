namespace Lytical.Artisan.Application.Commands
{
    public class LogoutCommandHandler : ICommandHandler<LogoutCommand>
    {
        public LogoutCommandHandler(IUserRepository refreshRepository)
        {
            _repository = refreshRepository;
        }
        public async Task<Result> HandleAsync(LogoutCommand command)
        {
            var user = await _repository.FindbyIdAsync(command.UserId);
            if (user == null)
                return ResultStatus<bool>.Fail(HttpStatusCode.Unauthorized, "Please, Log in to continue.");

            if (user is not User account)
                return ResultStatus<bool>.Fail(HttpStatusCode.InternalServerError, "Failed to delete user refresh token");

            account.RemoveRefreshToken();
            account.ResetAccessFailedCount();
            await _repository.UpdateAsync(user);

            return ResultStatus<bool>.Pass(HttpStatusCode.NoContent);
        }
        private readonly IUserRepository _repository;
    }
}
