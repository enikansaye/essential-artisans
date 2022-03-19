namespace Lytical.Artisan.Application.Commands
{
    public class LogoutCommandHandler : IRequestHandler<LogoutCommand>
    {
        public LogoutCommandHandler(IUserRepository refreshRepository)
        {
            _repository = refreshRepository;
        }
        public async Task<Result> HandleAsync(LogoutCommand request)
        {
            var user = await _repository.FindbyIdAsync(request.UserId);
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
