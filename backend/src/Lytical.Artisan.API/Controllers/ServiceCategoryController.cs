namespace Lytical.Artisan.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceCategoryController : BaseController
    {
        public ServiceCategoryController(IServiceCategoryRepository serviceRepository)
        {
            _serviceRepository = serviceRepository;
        }
        [AllowAnonymous]
        [HttpGet("all")]
        public async Task<IActionResult> GetAllServiceCategoriesAsync()
        {
            var handler = new GetAllServiceCategoriesQueryHandler(_serviceRepository);
            return await ExecuteRequestAsync(new GetAllServiceCategoriesQuery(), handler);
        }
        [AllowAdmin]
        [HttpPost("create")]
        public async Task<IActionResult> CreateServiceCategoryAsync(string request)
        {
            var handler = new CreateServiceCategoryCommandHandler(_serviceRepository);
            return await ExecuteAsync(request, handler);
        }
        [AllowAdmin]
        [HttpPut("update")]
        public async Task<IActionResult> UpdateServiceCategoryAsync(string request)
        {
            var handler = new UpdateServiceCategoryCommandHandler(_serviceRepository);
            return await ExecuteAsync(request, handler);
        }
        [AllowAdmin]
        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteServiceCategoryAsync(string request)
        {
            var handler = new DeleteServiceCategoryCommandHandler(_serviceRepository);
            return await ExecuteAsync(request, handler);
        }
        private readonly IServiceCategoryRepository _serviceRepository;
    }
}
