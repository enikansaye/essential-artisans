namespace Lytical.Artisan.Application.Commands
{
    public class RefreshTokenCommandHandler : IRequestHandler<RefreshTokenCommand, RefreshTokenDto>
    {
        public RefreshTokenCommandHandler(IUserRepository repository, IAuthTokenManger token, JwtSettings settings)
        {
            _repository = repository;
            _token = token;
            _settings = settings;
        }
        public async Task<Result<RefreshTokenDto>> HandleAsync(RefreshTokenCommand request)
        {
            var claims = _token.ValidateToken(request.Token, _settings.RefreshKey);
            if (claims.NotAny())
                return ResultStatus<RefreshTokenDto>.Fail(HttpStatusCode.Unauthorized, "Invalid refresh token");

            var user = await _repository.FindByRefreshTokenAsync(request.Token);

            if (user == null)
                return ResultStatus<RefreshTokenDto>.Fail(HttpStatusCode.BadRequest, "User not found.");

            if (user.HasActiveRefreshToken().IsFalse())
            {
                user.RemoveRefreshToken();
                return ResultStatus<RefreshTokenDto>.Fail(HttpStatusCode.BadRequest, "Refresh token not found");
            }

            var access_token = _token.GenerateAccessToken(user);
            var refresh_token = _token.GenerateRefreshToken();
            var date = DateTime.UtcNow.AddMinutes(_settings.RefreshExpiration);

            user.SetRefreshToken(refresh_token, date);
            await _repository.UpdateAsync(user);

            return ResultStatus<RefreshTokenDto>.Pass(new RefreshTokenDto
            {
                RefreshToken = refresh_token,
                AccessToken = access_token
            }, HttpStatusCode.OK);
        }
        private readonly IUserRepository _repository;
        private readonly JwtSettings _settings;
        private readonly IAuthTokenManger _token;
    }
}
