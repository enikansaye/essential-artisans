namespace Lytical.Artisan.Application.Commands
{
    public class ApproveServiceOrderCommandHandler : IRequestHandler<ApproveServiceOrderCommand, CreateServiceOrderDto>
    {
        public ApproveServiceOrderCommandHandler(IServiceOrderRepository repository)
        {
            _repository = repository;
        }
        public async Task<Result<CreateServiceOrderDto>> HandleAsync(ApproveServiceOrderCommand request)
        {
            var order = await _repository.FindbyIdAsync(request.OrderId);

            if (order == null)
                return ResultStatus<CreateServiceOrderDto>.Fail(HttpStatusCode.BadRequest, "Service order does not exists.");

            order.IsApproved = true;
            var dbOperation = await _repository.UpdateAsync(order);
            if (dbOperation.IsFalse()) return ResultStatus<CreateServiceOrderDto>.Fail(HttpStatusCode.InternalServerError, ErrorCode.FaultWhileSavingToDatabase.Message);

            var dto = new CreateServiceOrderDto()
            {
                Date = order.Date,
                Name = order.Name,
                PropertyAddress = order.PropertyAddress,
                InspectionDate = order.InspectionDate,
                InspectionTime = order.InspectionTime,
                IsApproved = order.IsApproved,
                Issue = order.Issue,
                Id = order.Id,
                UniqueId = order.UniqueId,
                ArtisanEmail = order.Artisan.Email,
                ArtisanName = order.Artisan.FullName,
                ArtisanPhoneNumber = order.Artisan.PhoneNumber,
                ArtisanLocation = order.Artisan.Location,
                ArtisanProfileImage = order.Artisan.ProfileImage,
                ArtisanRating = order.Artisan.GetArtisanRating(),
                CustomerEmail = order.Customer.Email,
                CustomerName = order.Customer.FullName,
                CustomerPhoneNumber = order.Customer.PhoneNumber,
            };
            return ResultStatus<CreateServiceOrderDto>.Pass(dto, HttpStatusCode.OK);
        }
        private readonly IServiceOrderRepository _repository;
    }
}
