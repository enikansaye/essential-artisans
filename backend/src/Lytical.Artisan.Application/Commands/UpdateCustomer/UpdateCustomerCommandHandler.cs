namespace Lytical.Artisan.Application.Commands
{
    public class UpdateCustomerCommandHandler : IRequestHandler<UpdateUserCommand, UpdateCustomerDto>
    {
        public UpdateCustomerCommandHandler(IUserRepository repository)
        {
            _repository = repository;
        }
        public async Task<Result<UpdateCustomerDto>> HandleAsync(UpdateUserCommand request)
        {
            var user = await _repository.FindbyIdAsync(request.UserId);

            if (user == null)
                return ResultStatus<UpdateCustomerDto>.Fail(HttpStatusCode.Unauthorized, "Account does not exists.");

            user.FirstName = request.FirstName;
            user.LastName = request.LastName;
            user.PhoneNumber = request.PhoneNumber;

            var dbOperation = await _repository.UpdateAsync(user);
            if (dbOperation.IsFalse()) return ResultStatus<UpdateCustomerDto>.Fail(HttpStatusCode.InternalServerError, ErrorCode.FaultWhileSavingToDatabase.Message);

            return ResultStatus<UpdateCustomerDto>.Pass(request, HttpStatusCode.OK);

        }
        private readonly IUserRepository _repository;
    }
}
