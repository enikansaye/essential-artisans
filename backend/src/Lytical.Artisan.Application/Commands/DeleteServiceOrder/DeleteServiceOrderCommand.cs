namespace Lytical.Artisan.Application.Commands
{
    public class DeleteServiceOrderCommand : IRequest
    {
        public Result Validate()
        {
            if (OrderId.IsNotValidId())
                return ResultStatus.Fail(HttpStatusCode.BadRequest, "A valid order id is required.");
            return ResultStatus.Pass(HttpStatusCode.OK);
        }
        public int OrderId { get; set; }
    }
}
