

namespace Lytical.Artisan.Application.Commands.Register
{
    public class RegisterCommandHandler : CommandHandler<RegisterCommand, RegisterUserDto>
    {
        public RegisterCommandHandler(IUserRepository repository, IEmailService email,
            IPasswordManager password, AppSettings app)
        {
            _repository = repository;
            _email = email;
            _password = password;
            _app = app;
        }
        public override async Task<Result<RegisterUserDto>> HandleAsync(RegisterCommand command)
        {
            var validation = InValidate(command, _repository);
            if (validation.NotSucceeded) return ResultStatus<RegisterUserDto>.Fail(validation.Status);

            var userExists = await _repository.ExistsAsync(command.Email);
            if (userExists.Data) return ResultStatus<RegisterUserDto>.Fail(ErrorCode.EmailExistInDatabase.Message);

            var token = _password.GenerateToken();
            var salt = _password.GenerateToken();
            var hash = _password.GetHash(command.Password, salt);

            var user = User.Create(command.Email, hash, salt);
            user.VerificationToken = token;

            var dbOperation = await _repository.AddAsync(user);
            if (dbOperation.NotSucceeded) return ResultStatus<RegisterUserDto>.Fail(dbOperation.Status);


            var emailBody = EmbedResource.Extract("EmailVerification.html")
                                         .Replace("{userEmail}", user.Email)
                                         .Replace("{contactEmail}", _app.ContactEmail)
                                         .Replace("{emailVerificationLink}", $"{_app.Origin}/verify?token={SafeUri.Encode(token)}");
            _email.To(command.Email);
            _email.Subject("Confirm Your Email");
            _email.Body(emailBody);
            var emailOperation = await _email.SendAsync();

            if (emailOperation.NotSucceeded) return ResultStatus<RegisterUserDto>.Fail("Email sending failed.");

            return ResultStatus<RegisterUserDto>.Pass(user.MapEmailDto());
        }
        private readonly IUserRepository _repository;
        private readonly IEmailService _email;
        private readonly IPasswordManager _password;
        private readonly AppSettings _app;

    }
}
