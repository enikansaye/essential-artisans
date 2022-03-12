namespace Lytical.Artisan.Application.Commands
{
    public class LoginCommandHandler : ICommandHandler<LoginCommand, LoginDto>
    {
        public LoginCommandHandler(IUserRepository repository, IPasswordManager password,
                                   IAuthTokenManger token, IRefreshTokenRepository refreshRepository,
                                   JwtSettings settings)
        {
            _repository = repository;
            _password = password;
            _token = token;
            _refreshRepository = refreshRepository;
            _settings = settings;
        }
        public async Task<Result<LoginDto>> HandleAsync(LoginCommand command)
        {
            var user = await _repository.FindbyEmailAsync(command.Email);

            if (user == null || user.IsEmailConfirmed.IsFalse())
                return ResultStatus<LoginDto>.Fail("Account does not exists or requires email varification.");

            var hash = _password.GetHash(command.Password, user.PasswordSalt);
            if (_password.CompareHash(hash, user.PasswordHash).IsFalse())
                return ResultStatus<LoginDto>.Fail("Email or password is incorrect");

            var access_token = _token.GenerateAccessToken(user);
            var refresh_token = _token.GenerateRefreshToken();
            var date = DateTime.UtcNow.AddMinutes(_settings.RefreshExpiration);

            var refreshToken = RefreshToken.Create(user.Id, user.UserId, refresh_token, date, command.IpAddress);
            await _refreshRepository.AddAsync(refreshToken);

            return ResultStatus<LoginDto>.Pass(new LoginDto
            {
                Email = command.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Id = user.UserId,
                UserId = user.Id,
                RefreshToken = refresh_token,
                AccessToken = access_token,
                UserType = user.UserType

            });
        }

        private readonly IUserRepository _repository;
        private readonly IRefreshTokenRepository _refreshRepository;
        private readonly IPasswordManager _password;
        private readonly JwtSettings _settings;
        private readonly IAuthTokenManger _token;
    }
}
