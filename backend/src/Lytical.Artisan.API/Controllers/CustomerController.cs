namespace Lytical.Artisan.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : BaseController
    {
        public CustomerController(IUserRepository repository)
        {
            _repository = repository;
        }

        [Authorize]
        [HttpGet("profile")]
        public async Task<IActionResult> GetCustomerProfileAsync(int id)
        {
            var handler = new GetCustomerProfileQueryHandler(_repository);
            return await ExecuteRequestAsync(new GetCustomerProfileQuery(id), handler);
        }
        private readonly IUserRepository _repository;
    }
}
