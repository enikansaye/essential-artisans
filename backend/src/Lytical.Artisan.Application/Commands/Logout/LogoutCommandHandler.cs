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
            return ResultStatus<bool>.Pass(dbOperations.Data);
        }
        private readonly IRefreshTokenRepository _refreshRepository;
    }
}
