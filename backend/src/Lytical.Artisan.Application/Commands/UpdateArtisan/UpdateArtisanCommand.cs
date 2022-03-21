namespace Lytical.Artisan.Application.Commands
{
    public class UpdateArtisanCommand : UpdateArtisanDto, IRequest<UpdateArtisanDto>
    {
        public Result<UpdateArtisanDto> Validate()
        {
            if (FirstName.IsNotValidString())
                return ResultStatus<UpdateArtisanDto>.Fail(HttpStatusCode.BadRequest, "Name cannot be null.");
            if (LastName.IsNotValidString())
                return ResultStatus<UpdateArtisanDto>.Fail(HttpStatusCode.BadRequest, "Name cannot be null.");

            return ResultStatus<UpdateArtisanDto>.Pass(HttpStatusCode.OK);
        }
    }
}
