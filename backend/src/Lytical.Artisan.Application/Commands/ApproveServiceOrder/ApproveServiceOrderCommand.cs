namespace Lytical.Artisan.Application.Commands
{
    public class ApproveServiceOrderCommand : IRequest<CreateServiceOrderDto>
    {
        public Result<CreateServiceOrderDto> Validate()
        {
            if (OrderId.IsNotValidId())
                return ResultStatus<CreateServiceOrderDto>.Fail(HttpStatusCode.BadRequest, "A valid order id is required.");
            return ResultStatus<CreateServiceOrderDto>.Pass(HttpStatusCode.OK);
        }
        public int OrderId { get; set; }
    }
}
