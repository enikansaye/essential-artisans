

namespace Lytical.Artisan.Application.Commands
{
    public class SignupCommandHandler : ICommandHandler<SignupCommand, SignupDto>
    {
        public SignupCommandHandler(IUserRepository repository, IEmailService email,
            IPasswordManager password, AppSettings app)
        {
            _repository = repository;
            _email = email;
            _password = password;
            _app = app;
        }
        public async Task<Result<SignupDto>> HandleAsync(SignupCommand command)
        {
            var userExists = await _repository.ExistsAsync(command.Email);
            if (userExists.IsFalse()) return ResultStatus<SignupDto>.Fail(HttpStatusCode.Conflict, ErrorCode.EmailExistInDatabase.Message);

            var token = _password.GenerateToken(2);
            var salt = _password.GenerateToken(0);
            var hash = _password.GetHash(command.Password, salt);

            var user = User.Create(command.Email, hash, salt);
            user.VerificationToken = token;

            var dbOperation = await _repository.AddAsync(user);
            if (dbOperation.IsFalse()) return ResultStatus<SignupDto>.Fail(HttpStatusCode.InternalServerError, ErrorCode.FaultWhileSavingToDatabase.Message);


            var emailBody = EmbedResource.Extract("EmailVerification.html")
                                         .Replace("{userEmail}", user.Email)
                                         .Replace("{contactEmail}", _app.ContactEmail)
                                         .Replace("{emailVerificationLink}", $"{_app.Origin}/api/auth/verify-email?token={SafeUri.Encode(token)}");
            _email.To(command.Email);
            _email.Subject("Confirm Your Email");
            _email.Body(emailBody);
            var emailOperation = await _email.SendAsync();

            if (emailOperation.IsFalse()) return ResultStatus<SignupDto>.Fail(HttpStatusCode.InternalServerError, "Email sending failed.");

            return ResultStatus<SignupDto>.Pass(user.MapEmailDto(), HttpStatusCode.OK);
        }
        private readonly IUserRepository _repository;
        private readonly IEmailService _email;
        private readonly IPasswordManager _password;
        private readonly AppSettings _app;

    }
}
