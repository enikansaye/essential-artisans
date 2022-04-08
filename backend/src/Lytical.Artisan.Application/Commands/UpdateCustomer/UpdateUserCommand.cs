namespace Lytical.Artisan.Application.Commands
{
    public class UpdateUserCommand : UpdateCustomerDto, IRequest<UpdateCustomerDto>
    {
        public Result<UpdateCustomerDto> Validate()
        {
            if (FirstName.IsNotValidString())
                return ResultStatus<UpdateCustomerDto>.Fail(HttpStatusCode.BadRequest, "Name cannot be null.");
            if (LastName.IsNotValidString())
                return ResultStatus<UpdateCustomerDto>.Fail(HttpStatusCode.BadRequest, "Name cannot be null.");

            return ResultStatus<UpdateCustomerDto>.Pass(HttpStatusCode.OK);
        }
    }
}
