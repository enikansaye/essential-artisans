namespace Lytical.Artisan.Application.Queries
{
    public class GetAllArtisansQuery : IRequest<List<GetArtisanProfileQueryDto>>
    {
        public Result<List<GetArtisanProfileQueryDto>> Validate()
        {
            return ResultStatus<List<GetArtisanProfileQueryDto>>.Pass(HttpStatusCode.OK);
        }
    }
}
