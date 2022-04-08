namespace Lytical.Artisan.Application.Commands
{
    public class CreateServiceCategoryCommandHandler : IRequestHandler<CreateServiceCategoryCommand, CreateServiceCategoryDto>
    {
        public CreateServiceCategoryCommandHandler(IServiceCategoryRepository repository)
        {
            _repository = repository;
        }
        public async Task<Result<CreateServiceCategoryDto>> HandleAsync(CreateServiceCategoryCommand request)
        {
            var serviceExists = await _repository.ExistsAsync(request.Name);
            if (serviceExists) return ResultStatus<CreateServiceCategoryDto>.Fail(HttpStatusCode.Conflict, "Category already exist.");

            var service = ServiceCategory.Create(request.Name);

            var dbOperation = await _repository.AddAsync(service);
            if (dbOperation.IsFalse()) return ResultStatus<CreateServiceCategoryDto>.Fail(HttpStatusCode.InternalServerError, ErrorCode.FaultWhileSavingToDatabase.Message);

            return ResultStatus<CreateServiceCategoryDto>.Pass(new CreateServiceCategoryDto(service.Name), HttpStatusCode.OK);
        }
        private readonly IServiceCategoryRepository _repository;
    }
}
