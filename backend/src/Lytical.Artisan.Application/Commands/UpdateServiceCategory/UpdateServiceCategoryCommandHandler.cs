namespace Lytical.Artisan.Application.Commands
{
    public class UpdateServiceCategoryCommandHandler : IRequestHandler<string, CreateServiceCategoryDto>
    {
        public UpdateServiceCategoryCommandHandler(IServiceCategoryRepository repository)
        {
            _repository = repository;
        }
        public async Task<Result<CreateServiceCategoryDto>> HandleAsync(string request)
        {
            var service = await _repository.FindByNameAsync(request);
            if (service == null) return ResultStatus<CreateServiceCategoryDto>.Fail(HttpStatusCode.Conflict, "Category doesn't exist.");

            service.Name = request;

            var dbOperation = await _repository.UpdateAsync(service);
            if (dbOperation.IsFalse()) return ResultStatus<CreateServiceCategoryDto>.Fail(HttpStatusCode.InternalServerError, ErrorCode.FaultWhileSavingToDatabase.Message);

            return ResultStatus<CreateServiceCategoryDto>.Pass(new CreateServiceCategoryDto(service.Name), HttpStatusCode.OK);
        }
        private readonly IServiceCategoryRepository _repository;
    }
}
