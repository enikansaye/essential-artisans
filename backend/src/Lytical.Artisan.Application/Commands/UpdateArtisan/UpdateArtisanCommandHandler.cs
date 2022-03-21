namespace Lytical.Artisan.Application.Commands
{
    public class UpdateArtisanCommandHandler : IRequestHandler<UpdateArtisanCommand, UpdateArtisanDto>
    {
        public UpdateArtisanCommandHandler(IUserRepository repository)
        {
            _repository = repository;
        }
        public async Task<Result<UpdateArtisanDto>> HandleAsync(UpdateArtisanCommand request)
        {
            var user = await _repository.FindArtisanByIdAsync(request.UserId);

            if (user == null)
                return ResultStatus<UpdateArtisanDto>.Fail(HttpStatusCode.Unauthorized, "Account does not exists.");

            user.FirstName = request.FirstName;
            user.LastName = request.LastName;
            user.PhoneNumber = request.PhoneNumber;
            user.Address = request.Address;
            user.Location = request.Location;

            var dbOperation = await _repository.UpdateAsync(user);
            if (dbOperation.IsFalse()) return ResultStatus<UpdateArtisanDto>.Fail(HttpStatusCode.InternalServerError, ErrorCode.FaultWhileSavingToDatabase.Message);

            return ResultStatus<UpdateArtisanDto>.Pass(request, HttpStatusCode.OK);

        }
        private readonly IUserRepository _repository;
    }
}
