namespace Lytical.Artisan.Application.Commands
{
    public class ResetPasswordCommandHandler : IRequestHandler<ResetPasswordCommand>
    {
        public ResetPasswordCommandHandler(IUserRepository repository, IPasswordManager password)
        {
            _repository = repository;
            _password = password;
        }
        public async Task<Result> HandleAsync(ResetPasswordCommand request)
        {
            var user = await _repository.FindByPasswordResetTokenAsync(request.Token);

            if (user == null || user.HasExpiredPasswordRestToken())
                return ResultStatus.Fail(HttpStatusCode.BadRequest, ErrorCode.InvalidChangePasswordToken.Message);

            var salt = _password.GenerateToken(0);
            var hash = _password.GetHash(request.Password, salt);

            user.UpdatePassword(hash, salt);

            var dbOperation = await _repository.UpdateAsync(user);
            if (dbOperation.IsFalse()) return ResultStatus.Fail(HttpStatusCode.InternalServerError, ErrorCode.FaultWhileSavingToDatabase.Message);

            return ResultStatus.Pass(HttpStatusCode.OK);

        }
        private readonly IUserRepository _repository;
        private readonly IPasswordManager _password;
    }
}
