namespace Lytical.Artisan.Application.Queries
{
    public class GetArtisanProfileQueryHandler : IRequestHandler<GetArtisanProfileQuery, GetArtisanProfileQueryDto>
    {
        public GetArtisanProfileQueryHandler(IUserRepository repository)
        {
            _repository = repository;
        }
        public async Task<Result<GetArtisanProfileQueryDto>> HandleAsync(GetArtisanProfileQuery request)
        {
            var user = await _repository.FindArtisanByIdAsync(request.UserId);

            if (user == null || user.AccountType != Domain.Enums.AccountType.ARTISAN)
                return ResultStatus<GetArtisanProfileQueryDto>.Fail(HttpStatusCode.BadRequest, "Account does not exists or requires email varification.");

            return ResultStatus<GetArtisanProfileQueryDto>.Pass(new GetArtisanProfileQueryDto
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
            }, HttpStatusCode.OK, "Request was successful.");
        }
        private readonly IUserRepository _repository;
    }
}
