namespace Lytical.Artisan.Application.Commands
{
    public class RefreshTokenCommandHandler : ICommandHandler<RefreshTokenCommand, RefreshTokenDto>
    {
        public RefreshTokenCommandHandler(IUserRepository repository, IAuthTokenManger token,
                                        IRefreshTokenRepository refreshRepository, JwtSettings settings)
        {
            _repository = repository;
            _token = token;
            _refreshRepository = refreshRepository;
            _settings = settings;
        }
        public async Task<Result<RefreshTokenDto>> HandleAsync(RefreshTokenCommand command)
        {
            var claims = _token.ValidateToken(command.Token, _settings.RefreshKey);
            if (claims.NotAny())
                return ResultStatus<RefreshTokenDto>.Fail(HttpStatusCode.Unauthorized, "Invalid refresh token");

            var refreshToken = await _refreshRepository.FindbyTokenAsync(command.Token);

            if (refreshToken == null || refreshToken.IsActive.IsFalse())
                return ResultStatus<RefreshTokenDto>.Fail(HttpStatusCode.BadRequest, "Refresh token not found");

            var user = await _repository.FindbyIdAsync(refreshToken.UserId);

            if (user == null)
            {
                await _refreshRepository.RemoveAsync(refreshToken);
                return ResultStatus<RefreshTokenDto>.Fail(HttpStatusCode.BadRequest, "User not found.");
            }

            var access_token = _token.GenerateAccessToken(user);
            var refresh_token = _token.GenerateRefreshToken();

            refreshToken.ChangeRefreshToken(refresh_token);
            await _refreshRepository.UpdateAsync(refreshToken);

            return ResultStatus<RefreshTokenDto>.Pass(new RefreshTokenDto
            {
                RefreshToken = refresh_token,
                AccessToken = access_token
            },HttpStatusCode.OK);
        }
        private readonly IUserRepository _repository;
        private readonly IRefreshTokenRepository _refreshRepository;
        private readonly JwtSettings _settings;
        private readonly IAuthTokenManger _token;
    }
}
