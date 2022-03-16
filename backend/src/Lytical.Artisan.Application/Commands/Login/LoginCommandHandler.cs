namespace Lytical.Artisan.Application.Commands
{
    public class LoginCommandHandler : ICommandHandler<LoginCommand, LoginDto>
    {
        public LoginCommandHandler(IUserRepository repository, IPasswordManager password,
                                   IAuthTokenManger token, JwtSettings settings)
        {
            _repository = repository;
            _password = password;
            _token = token;
            _settings = settings;
        }
        public async Task<Result<LoginDto>> HandleAsync(LoginCommand command)
        {
            var user = await _repository.FindbyEmailAsync(command.Email);

            if (user == null || user.ConfirmEmail().IsFalse())
                return ResultStatus<LoginDto>.Fail(HttpStatusCode.Unauthorized, "Account does not exists or requires email varification.");

            var hash = _password.GetHash(command.Password, user.PasswordSalt);
            if (_password.CompareHash(hash, user.PasswordHash).IsFalse())
            {
                user.IncrementAccessFailedCount();
                return ResultStatus<LoginDto>.Fail(HttpStatusCode.Unauthorized, "Email or password is incorrect");
            }

            var access_token = _token.GenerateAccessToken(user);
            var refresh_token = _token.GenerateRefreshToken();
            var date = DateTime.UtcNow.AddMinutes(_settings.RefreshExpiration);

            user.SetRefreshToken(refresh_token, date);
            user.ResetAccessFailedCount();
            await _repository.UpdateAsync(user);

            return ResultStatus<LoginDto>.Pass(new LoginDto
            {
                Email = command.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Id = user.UserId,
                UserId = user.Id,
                RefreshToken = refresh_token,
                AccessToken = access_token,
                UserType = user.UserType,

            }, HttpStatusCode.OK, "Login successful.");
        }

        private readonly IUserRepository _repository;
        private readonly IPasswordManager _password;
        private readonly JwtSettings _settings;
        private readonly IAuthTokenManger _token;
    }
}
