namespace Lytical.Artisan.Application.Queries
{
    public class GetAllCustomersQuery : IRequest<List<GetCustomerProfileQueryDto>>
    {
        public Result<List<GetCustomerProfileQueryDto>> Validate()
        {
            return ResultStatus<List<GetCustomerProfileQueryDto>>.Pass(HttpStatusCode.OK);
        }
    }
}
