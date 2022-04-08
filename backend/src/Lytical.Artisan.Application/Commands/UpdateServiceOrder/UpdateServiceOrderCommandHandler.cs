namespace Lytical.Artisan.Application.Commands
{
    public class UpdateServiceOrderCommandHandler : IRequestHandler<UpdateServiceOrderCommand, CreateServiceOrderDto>
    {
        public UpdateServiceOrderCommandHandler(IServiceOrderRepository repository, IUserRepository userRepository)
        {
            _repository = repository;
            _userRepository = userRepository;
        }
        public async Task<Result<CreateServiceOrderDto>> HandleAsync(UpdateServiceOrderCommand request)
        {
            var customer = await _userRepository.FindbyIdAsync(request.CustomerId);

            if (customer == null)
                return ResultStatus<CreateServiceOrderDto>.Fail(HttpStatusCode.Unauthorized, "Account does not exists or requires email varification.");

            var artisan = await _userRepository.FindArtisanByIdAsync(request.ArtisanId);

            if (artisan == null)
                return ResultStatus<CreateServiceOrderDto>.Fail(HttpStatusCode.BadRequest, "The artisan account does not exists.");

            var order = await _repository.FindbyIdAsync(request.OrderId);

            if (order == null)
                return ResultStatus<CreateServiceOrderDto>.Fail(HttpStatusCode.BadRequest, "Service order does not exists.");

            if (order.IsApproved)
                return ResultStatus<CreateServiceOrderDto>.Fail(HttpStatusCode.BadRequest, "Cannot update Order. Service order has been approved.");

            order.SetDateTime(request.InspectionDate, request.InspectionTime);
            order.Artisan = artisan;
            order.Name = request.Name;
            order.PropertyAddress = request.PropertyAddress;
            order.Issue = request.Issue;

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
        private readonly IUserRepository _userRepository;
    }
}
