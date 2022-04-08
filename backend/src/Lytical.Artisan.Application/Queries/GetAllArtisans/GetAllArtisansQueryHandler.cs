namespace Lytical.Artisan.Application.Queries
{
    public class GetAllArtisansQueryHandler : IRequestHandler<GetAllArtisansQuery, List<GetArtisanProfileQueryDto>>
    {
        public GetAllArtisansQueryHandler(IUserRepository repository)
        {
            _repository = repository;
        }
        public async Task<Result<List<GetArtisanProfileQueryDto>>> HandleAsync(GetAllArtisansQuery request)
        {
            var users = await _repository.FindAllArtisanAsync();

            if (users.NotAny())
                return ResultStatus<List<GetArtisanProfileQueryDto>>.Fail(HttpStatusCode.NotFound, "Artisan(s) not found.");

            var artisans = new List<GetArtisanProfileQueryDto>();
            foreach (var user in users)
            {
                var artisan = new GetArtisanProfileQueryDto()
                {
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Id = user.Id,
                    PhoneNumber = user.PhoneNumber,
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
