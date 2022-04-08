namespace Lytical.Artisan.Application.Queries
{
    public class GetAllServiceOrdersQuery : IRequest<List<GetAllServiceOrdersQueryDto>>
    {
        public Result<List<GetAllServiceOrdersQueryDto>> Validate()
        {
            return ResultStatus<List<GetAllServiceOrdersQueryDto>>.Pass(HttpStatusCode.OK);
        }
    }
}
