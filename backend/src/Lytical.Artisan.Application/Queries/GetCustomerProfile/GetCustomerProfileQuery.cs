namespace Lytical.Artisan.Application.Queries
{
    public class GetCustomerProfileQuery : IRequest<GetCustomerProfileQueryDto>
    {
        public GetCustomerProfileQuery(int id) => UserId = id;
        public Result<GetCustomerProfileQueryDto> Validate()
        {
            if (UserId.IsNotValidId())
                return ResultStatus<GetCustomerProfileQueryDto>.Fail(HttpStatusCode.Unauthorized, "Customer ID is required.");

            return ResultStatus<GetCustomerProfileQueryDto>.Pass(HttpStatusCode.OK);
        }
        public int UserId { get; set; }
    }
}
