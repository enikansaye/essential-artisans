using Lytical.Artisan.Domain.Enums;

namespace Lytical.Artisan.Application.Commands
{
    public class CreateServiceOrderCommandHandler : IRequestHandler<CreateServiceOrderCommand, CreateServiceOrderCommandDto>
    {
        public CreateServiceOrderCommandHandler(IServiceOrderRepository repository, IFileManager file)
        {
            _repository = repository;
            _file = file;
        }
        public async Task<Result<CreateServiceOrderCommandDto>> HandleAsync(CreateServiceOrderCommand request)
        {
            var customer = await _userRepository.FindbyIdAsync(request.CustomerId);
            var artisan = await _userRepository.FindArtisanByIdAsync(request.ArtisanId);

            if (customer == null)
                return ResultStatus<CreateServiceOrderCommandDto>.Fail(HttpStatusCode.Unauthorized, "Account does not exists or requires email varification.");

            if (artisan == null)
                return ResultStatus<CreateServiceOrderCommandDto>.Fail(HttpStatusCode.Unauthorized, "The artisan account does not exists.");

            var order = ServiceOrder.Create(request.Name, request.PropertyAddress, request.Issue);
            order.SetDateTime(request.InspectionDate, request.InspectionTime);
            order.Customer = customer;
            order.Artisan = artisan;

            foreach (var item in request.FileNames)
            {
                var filePath = await _file.AddFileAsync(item, FileType.IMG, FileSize.MB2);
                order.AddFile(new OrderMediaFile()
                {
                    FileName = item,
                    FilePath = filePath
                });

            }

            var dbOperation = await _repository.AddAsync(order);
            if (dbOperation.IsFalse()) return ResultStatus<CreateServiceOrderCommandDto>.Fail(HttpStatusCode.InternalServerError, ErrorCode.FaultWhileSavingToDatabase.Message);

            return ResultStatus<CreateServiceOrderCommandDto>.Pass(new CreateServiceOrderCommandDto(), HttpStatusCode.OK);
        }
        private readonly IFileManager _file;
        private readonly IServiceOrderRepository _repository;
        private readonly IUserRepository _userRepository;
        private readonly IServiceCategoryRepository _serviceRepository;
    }
}
