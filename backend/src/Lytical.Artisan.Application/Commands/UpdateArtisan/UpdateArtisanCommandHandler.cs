namespace Lytical.Artisan.Application.Commands
{
    public class UpdateArtisanCommandHandler : IRequestHandler<UpdateArtisanCommand, UpdateArtisanDto>
    {
        public UpdateArtisanCommandHandler(IUserRepository repository, IServiceCategoryRepository serviceCategoryRepository)
        {
            _repository = repository;
            _serviceCategoryRepository = serviceCategoryRepository;
        }
        public async Task<Result<UpdateArtisanDto>> HandleAsync(UpdateArtisanCommand request)
        {
            var user = await _repository.FindArtisanByIdAsync(request.UserId);

            if (user == null)
                return ResultStatus<UpdateArtisanDto>.Fail(HttpStatusCode.Unauthorized, "Account does not exists.");
            var service = await _serviceCategoryRepository.FindByNameAsync(request.Service);
            if (service == null)
                return ResultStatus<UpdateArtisanDto>.Fail(HttpStatusCode.NoContent, "Selected service does not exists.");

            user.FirstName = request.FirstName;
            user.LastName = request.LastName;
            user.PhoneNumber = request.PhoneNumber;
            user.Address = request.Address;
            user.Location = request.Location;

            user.Category = service;
            service.Add(user);

            var dbOperation = await _repository.UpdateAsync(user);
            var dbOperation1 = await _serviceCategoryRepository.UpdateAsync(service);
            if (dbOperation.IsFalse() || dbOperation1.IsFalse()) return ResultStatus<UpdateArtisanDto>.Fail(HttpStatusCode.InternalServerError, ErrorCode.FaultWhileSavingToDatabase.Message);

            return ResultStatus<UpdateArtisanDto>.Pass(request, HttpStatusCode.OK);

        }
        private readonly IUserRepository _repository;
        private readonly IServiceCategoryRepository _serviceCategoryRepository;
    }
}
