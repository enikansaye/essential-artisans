namespace Lytical.Artisan.Application.Queries
{
    public class GetAllServiceOrdersQueryHandler : IRequestHandler<GetAllServiceOrdersQuery, List<GetAllServiceOrdersQueryDto>>
    {
        public GetAllServiceOrdersQueryHandler(IServiceOrderRepository repository)
        {
            _repository = repository;
        }
        public async Task<Result<List<GetAllServiceOrdersQueryDto>>> HandleAsync(GetAllServiceOrdersQuery request)
        {
            var orders = await _repository.FindAllAsync();

            if (orders.NotAny())
                return ResultStatus<List<GetAllServiceOrdersQueryDto>>.Fail(HttpStatusCode.NotFound, "order(s) not found.");

            var dtos = new List<GetAllServiceOrdersQueryDto>();
            foreach (var order in orders)
            {
                var dto = new GetAllServiceOrdersQueryDto()
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
                dtos.Add(dto);
            }
            return ResultStatus<List<GetAllServiceOrdersQueryDto>>.Pass(dtos, HttpStatusCode.OK);
        }

        private readonly IServiceOrderRepository _repository;
    }
}
