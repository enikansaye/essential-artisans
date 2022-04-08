namespace Lytical.Artisan.Application.Queries
{
    public class GetAllServiceCategoriesQuery : IRequest<List<GetServiceCategoryQueryDto>>
    {
        public Result<List<GetServiceCategoryQueryDto>> Validate()
        {
            return ResultStatus<List<GetServiceCategoryQueryDto>>.Pass(HttpStatusCode.OK);
        }
    }
}
