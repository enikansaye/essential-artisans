namespace Lytical.Artisan.Application.Queries
{
    public class GetAllCustomersQueryHandler : IRequestHandler<GetAllCustomersQuery, List<GetCustomerProfileQueryDto>>
    {
        public GetAllCustomersQueryHandler(IUserRepository repository)
        {
            _repository = repository;
        }
        public async Task<Result<List<GetCustomerProfileQueryDto>>> HandleAsync(GetAllCustomersQuery request)
        {
            var users = await _repository.FindAllCustomerAsync();

            if (users.NotAny())
                return ResultStatus<List<GetCustomerProfileQueryDto>>.Fail(HttpStatusCode.NotFound, "Customer(s) not found.");

            var customers = new List<GetCustomerProfileQueryDto>();
            foreach (var user in users)
            {
                var customer = new GetCustomerProfileQueryDto()
                {
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Id = user.Id,
                    PhoneNumber = user.PhoneNumber,
                };
                customers.Add(customer);
            }
            return ResultStatus<List<GetCustomerProfileQueryDto>>.Pass(customers, HttpStatusCode.OK);
        }

        private readonly IUserRepository _repository;
    }
}
