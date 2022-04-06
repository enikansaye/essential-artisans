namespace Lytical.Artisan.API.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class CustomerController : BaseController
    {
        public CustomerController(IUserRepository repository)
        {
            _repository = repository;
        }
        [AllowCustomer]
        [HttpGet("profile")]
        public async Task<IActionResult> GetCustomerProfileAsync(int id)
        {
            var handler = new GetCustomerProfileQueryHandler(_repository);
            return await ExecuteRequestAsync(new GetCustomerProfileQuery(id), handler);
        }
        [AllowAdmin]
        [HttpGet("all")]
        public async Task<IActionResult> GetAllCustomersAsync()
        {
            var handler = new GetAllCustomersQueryHandler(_repository);
            return await ExecuteRequestAsync(new GetAllCustomersQuery(), handler);
        }
        [AllowCustomer]
        [HttpPut("update")]
        public async Task<IActionResult> UpdateCustomerProfileAsync(UpdateUserCommand request)
        {
            var handler = new UpdateCustomerCommandHandler(_repository);
            return await ExecuteRequestAsync(request, handler);
        }
        private readonly IUserRepository _repository;
    }
}
