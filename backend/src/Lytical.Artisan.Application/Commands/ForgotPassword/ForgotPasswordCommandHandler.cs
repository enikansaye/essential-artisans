namespace Lytical.Artisan.Application.Commands
{
    public class ForgotPasswordCommandHandler : IRequestHandler<ForgotPasswordCommand>
    {
        public ForgotPasswordCommandHandler(IUserRepository repository, IEmailService email,
        IPasswordManager password, AppSettings app)
        {
            _repository = repository;
            _email = email;
            _password = password;
            _app = app;
        }
        public async Task<Result> HandleAsync(ForgotPasswordCommand request)
        {
            var user = await _repository.FindbyEmailAsync(request.Email);

            if (user == null)
                return ResultStatus.Fail(HttpStatusCode.BadRequest, $"Account with the email, {request.Email} does not exists.");

            user.PasswordResetToken = _password.GenerateToken(2);
            user.PasswordResetStamp = DateTime.UtcNow;

            var dbOperation = await _repository.AddAsync(user);
            if (dbOperation.IsFalse()) return ResultStatus.Fail(HttpStatusCode.InternalServerError, ErrorCode.FaultWhileSavingToDatabase.Message);


            var emailBody = EmbedResource.Extract("PasswordReset.html")
                                            .Replace("{userEmail}", user.Email)
                                            .Replace("{passwordResetLink}", $"{_app.Origin}/reset-password?token={SafeUri.Encode(user.PasswordResetToken)}");
            _email.To(request.Email);
            _email.Subject("[Artisan Connect] Password Reset");
            _email.Body(emailBody);
            var emailOperation = await _email.SendAsync();

            if (emailOperation.IsFalse()) return ResultStatus.Fail(HttpStatusCode.InternalServerError, "Email sending failed.");

            return ResultStatus.Pass(HttpStatusCode.OK);
        }
        private readonly IUserRepository _repository;
        private readonly IEmailService _email;
        private readonly IPasswordManager _password;
        private readonly AppSettings _app;
    }
}
