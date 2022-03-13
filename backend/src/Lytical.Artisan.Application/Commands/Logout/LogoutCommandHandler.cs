namespace Lytical.Artisan.Application.Commands
{
    public class LogoutCommandHandler : ICommandHandler<LogoutCommand>
    {
        public LogoutCommandHandler(IRefreshTokenRepository refreshRepository)
        {
            _refreshRepository = refreshRepository;
        }
        public async Task<Result> HandleAsync(LogoutCommand command)
        {
            var dbOperations = await _refreshRepository.RemoveAllByUserIdAsync(command.UserId);
            if (dbOperations.IsFalse())
                return ResultStatus<bool>.Fail(HttpStatusCode.InternalServerError, "Failed to delete user refresh token");
            return ResultStatus<bool>.Pass(HttpStatusCode.NoContent);
        }
        private readonly IRefreshTokenRepository _refreshRepository;
    }
}
