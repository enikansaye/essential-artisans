namespace Lytical.Artisan.Application.Commands
{
    public class VerifyEmailCommandHandler : IRequestHandler<string>
    {
        public VerifyEmailCommandHandler(IUserRepository repository)
        {
            _repository = repository;
        }
        public async Task<Result> HandleAsync(string request)
        {
            var user = await _repository.VerifyEmailAsync(request);

            if (user == null)
                return ResultStatus.Fail(HttpStatusCode.BadRequest, ErrorCode.InvalidEmailConfirmationToken.Message);

            user.ClearEmailConfirmation();
            user.SetEmailConfirmation(DateTime.UtcNow);

            var dbOperation = await _repository.UpdateAsync(user);
            if (dbOperation.IsFalse()) return ResultStatus.Fail(HttpStatusCode.InternalServerError, ErrorCode.FaultWhileSavingToDatabase.Message);

            return ResultStatus.Pass(HttpStatusCode.OK, "Email verification successful.");

        }
        private readonly IUserRepository _repository;
    }
}
