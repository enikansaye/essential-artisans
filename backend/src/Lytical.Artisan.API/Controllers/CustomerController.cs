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

        [HttpGet("profile")]
        public async Task<IActionResult> GetCustomerProfileAsync(int id)
        {
            var handler = new GetCustomerProfileQueryHandler(_repository);
            return await ExecuteRequestAsync(new GetCustomerProfileQuery(id), handler);
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllCustomersAsync()
        {
            var handler = new GetAllCustomersQueryHandler(_repository);
            return await ExecuteRequestAsync(new GetAllCustomersQuery(), handler);
        }
        private readonly IUserRepository _repository;
    }
}
