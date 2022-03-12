namespace Lytical.Artisan.Application.Commands
{
    public class VerifyEmailCommandHandler : ICommandHandler<string>
    {
        public VerifyEmailCommandHandler(IUserRepository repository)
        {
            _repository = repository;
        }
        public async Task<Result> HandleAsync(string command)
        {
            var user = await _repository.VerifyEmailAsync(command);

            if (user == null)
                return ResultStatus.Fail(ErrorCode.InvalidEmailConfirmationToken.Message);

            user.ClearEmailConfirmation();
            user.SetEmailConfirmation(DateTime.UtcNow);

            var dbOperation = await _repository.UpdateAsync(user);
            if (dbOperation.NotSucceeded) return ResultStatus.Fail(dbOperation.Status);

            return ResultStatus.Pass("Email verification successful.");

        }
        private readonly IUserRepository _repository;
    }
}
