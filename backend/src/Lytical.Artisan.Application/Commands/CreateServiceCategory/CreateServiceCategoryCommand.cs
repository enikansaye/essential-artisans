namespace Lytical.Artisan.Application.Commands
{
    public class CreateServiceCategoryCommand : IRequest<CreateServiceCategoryDto>
    {
        public Result<CreateServiceCategoryDto> Validate()
        {
            if (Name.IsNotValidString())
                return ResultStatus<CreateServiceCategoryDto>.Fail(HttpStatusCode.BadRequest, "A valid name is required.");
            return ResultStatus<CreateServiceCategoryDto>.Pass(HttpStatusCode.OK);
        }
        public string Name { get; set; }
    }
}
