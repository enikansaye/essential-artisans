namespace Lytical.Artisan.Application.Commands
{
    public class DeleteServiceOrderCommandHandler : IRequestHandler<DeleteServiceOrderCommand>
    {
        public DeleteServiceOrderCommandHandler(IServiceOrderRepository repository)
        {
            _repository = repository;
        }
        public async Task<Result> HandleAsync(DeleteServiceOrderCommand request)
        {
            var order = await _repository.FindbyIdAsync(request.OrderId);

            if (order == null)
                return ResultStatus.Fail(HttpStatusCode.BadRequest, "Service order does not exists.");

            if (order.IsApproved)
                return ResultStatus.Fail(HttpStatusCode.BadRequest, "Cannot delete Order. Service order has been approved.");

            var dbOperation = await _repository.UpdateAsync(order);
            if (dbOperation.IsFalse()) return ResultStatus.Fail(HttpStatusCode.InternalServerError, ErrorCode.FaultWhileSavingToDatabase.Message);

            return ResultStatus.Pass(HttpStatusCode.OK);
        }
        private readonly IServiceOrderRepository _repository;
    }
}
