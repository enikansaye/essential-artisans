namespace Lytical.Artisan.Application.Queries
{
    public class GetArtisanProfileQuery : IRequest<GetArtisanProfileQueryDto>
    {
        public GetArtisanProfileQuery(int id) => UserId = id;
        public Result<GetArtisanProfileQueryDto> Validate()
        {
            if (UserId.IsNotValidId())
                return ResultStatus<GetArtisanProfileQueryDto>.Fail(HttpStatusCode.Unauthorized, "Artisan ID is required.");

            return ResultStatus<GetArtisanProfileQueryDto>.Pass(HttpStatusCode.OK);
        }
        public int UserId { get; set; }
    }
}
