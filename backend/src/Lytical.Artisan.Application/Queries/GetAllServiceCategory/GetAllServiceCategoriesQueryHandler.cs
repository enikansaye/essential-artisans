namespace Lytical.Artisan.Application.Queries
{
    public class GetAllServiceCategoriesQueryHandler : IRequestHandler<GetAllServiceCategoriesQuery, List<GetServiceCategoryQueryDto>>
    {
        public GetAllServiceCategoriesQueryHandler(IServiceCategoryRepository repository)
        {
            _repository = repository;
        }
        public async Task<Result<List<GetServiceCategoryQueryDto>>> HandleAsync(GetAllServiceCategoriesQuery request)
        {
            var services = await _repository.FindAllAsync();

            if (services.NotAny())
                return ResultStatus<List<GetServiceCategoryQueryDto>>.Fail(HttpStatusCode.NotFound, "Category not found.");

            var serviceList = new List<GetServiceCategoryQueryDto>();
            foreach (var service in services)
                serviceList.Add(new GetServiceCategoryQueryDto(service.Name));

            return ResultStatus<List<GetServiceCategoryQueryDto>>.Pass(serviceList, HttpStatusCode.OK);
        }

        private readonly IServiceCategoryRepository _repository;
    }
}
