namespace Lytical.Artisan.Application.Commands
{
    public class CreateServiceOrderCommand : IRequest<CreateServiceOrderDto>
    {
        public Result<CreateServiceOrderDto> Validate()
        {
            if (Name.IsNotValidString())
                return ResultStatus<CreateServiceOrderDto>.Fail(HttpStatusCode.BadRequest, "A valid name is required.");
            if (ArtisanId.IsNotValidId())
                return ResultStatus<CreateServiceOrderDto>.Fail(HttpStatusCode.BadRequest, "A valid artisan ID is required.");
            if (CustomerId.IsNotValidId())
                return ResultStatus<CreateServiceOrderDto>.Fail(HttpStatusCode.BadRequest, "A valid customer ID is required.");
            if (PropertyAddress.IsNotValidString())
                return ResultStatus<CreateServiceOrderDto>.Fail(HttpStatusCode.BadRequest, "A valid property location is required.");
            return ResultStatus<CreateServiceOrderDto>.Pass(HttpStatusCode.OK);
        }
        public int CustomerId { get; set; }
        public int ArtisanId { get; set; }
        public string Name { get; set; }
        public string PropertyAddress { get; set; }
        public string Issue { get; set; }
        public DateTime InspectionDate { get; set; }
        public DateTime InspectionTime { get; set; }
    }
}
