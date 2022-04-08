namespace Lytical.Artisan.Application.Queries
{
    public class GetCustomerProfileQueryHandler : IRequestHandler<GetCustomerProfileQuery, GetCustomerProfileQueryDto>
    {
        public GetCustomerProfileQueryHandler(IUserRepository repository)
        {
            _repository = repository;
        }
        public async Task<Result<GetCustomerProfileQueryDto>> HandleAsync(GetCustomerProfileQuery request)
        {
            var user = await _repository.FindbyIdAsync(request.UserId);

            if (user == null)
                return ResultStatus<GetCustomerProfileQueryDto>.Fail(HttpStatusCode.BadRequest, "Account does not exists or requires email varification.");

            return ResultStatus<GetCustomerProfileQueryDto>.Pass(new GetCustomerProfileQueryDto
            {
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Id = user.Id,
                PhoneNumber = user.PhoneNumber,
            }, HttpStatusCode.OK, "Request was successful.");
        }
        private readonly IUserRepository _repository;
    }
}
