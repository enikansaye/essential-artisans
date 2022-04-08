namespace Lytical.Artisan.Application.Commands
{
    public class CreateServiceOrderCommandHandler : IRequestHandler<CreateServiceOrderCommand, CreateServiceOrderDto>
    {
        public CreateServiceOrderCommandHandler(IServiceOrderRepository repository, IUserRepository userRepository)
        {
            _repository = repository;
            _userRepository = userRepository;
        }
        public async Task<Result<CreateServiceOrderDto>> HandleAsync(CreateServiceOrderCommand request)
        {
            var customer = await _userRepository.FindbyIdAsync(request.CustomerId);

            if (customer == null)
                return ResultStatus<CreateServiceOrderDto>.Fail(HttpStatusCode.Unauthorized, "Account does not exists or requires email varification.");

            var artisan = await _userRepository.FindArtisanByIdAsync(request.ArtisanId);

            if (artisan == null)
                return ResultStatus<CreateServiceOrderDto>.Fail(HttpStatusCode.BadRequest, "The artisan account does not exists.");

            var order = ServiceOrder.Create(request.Name, request.PropertyAddress, request.Issue);
            order.SetDateTime(request.InspectionDate, request.InspectionTime);
            order.Customer = customer;
            order.Artisan = artisan;

            var dbOperation = await _repository.AddAsync(order);
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
