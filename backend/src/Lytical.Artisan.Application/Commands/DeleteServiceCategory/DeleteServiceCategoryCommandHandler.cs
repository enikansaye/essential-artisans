namespace Lytical.Artisan.Application.Commands
{
    public class DeleteServiceCategoryCommandHandler : IRequestHandler<string>
    {
        public DeleteServiceCategoryCommandHandler(IServiceCategoryRepository repository)
        {
            _repository = repository;
        }
        public async Task<Result> HandleAsync(string request)
        {
            var dbOperation = await _repository.RemoveAsync(request);
            if (dbOperation.IsFalse()) return ResultStatus.Fail(HttpStatusCode.InternalServerError, ErrorCode.FaultWhileSavingToDatabase.Message);

            return ResultStatus.Pass(HttpStatusCode.OK);
        }
        private readonly IServiceCategoryRepository _repository;
    }
}
