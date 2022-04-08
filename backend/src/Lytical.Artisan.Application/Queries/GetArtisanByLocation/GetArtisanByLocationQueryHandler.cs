namespace Lytical.Artisan.Application.Queries
{
    public class GetArtisanByLocationQueryHandler : IRequestHandler<string, List<GetArtisanProfileQueryDto>>
    {
        public GetArtisanByLocationQueryHandler(IUserRepository repository)
        {
            _repository = repository;
        }
        public async Task<Result<List<GetArtisanProfileQueryDto>>> HandleAsync(string request)
        {
            var users = await _repository.FindArtisansByLocationAsync(request);

            if (users.NotAny())
                return ResultStatus<List<GetArtisanProfileQueryDto>>.Fail(HttpStatusCode.NotFound, "Artisan(s) not found.");

            var artisans = new List<GetArtisanProfileQueryDto>();
            foreach (var user in users)
            {
                var artisan = new GetArtisanProfileQueryDto()
                {
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Id = user.Id,
                    Address = user.Address,
                    Location = user.Location,
                    Profession = user.Profession,
                    ProfileImage = user.ProfileImage,
                    ReviewCount = user.Reviews.Count,
                    Rating = user.GetArtisanRating(),
                };
                artisans.Add(artisan);
            }
            return ResultStatus<List<GetArtisanProfileQueryDto>>.Pass(artisans, HttpStatusCode.OK);
        }

        private readonly IUserRepository _repository;
    }
}
