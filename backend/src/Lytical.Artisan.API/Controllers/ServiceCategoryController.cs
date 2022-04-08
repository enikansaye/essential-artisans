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
        private readonly IServiceCategoryRepository _serviceRepository;
    }
}
