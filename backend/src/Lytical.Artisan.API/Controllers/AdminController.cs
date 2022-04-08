namespace Lytical.Artisan.API.Controllers
{
    [Route("api/[controller]")]
    [AllowAdmin]
    [ApiController]
    public class AdminController : BaseController
    {
        public AdminController(IServiceCategoryRepository serviceRepository,
            IUserRepository repository, IServiceOrderRepository orderRepository)
        {
            _serviceRepository = serviceRepository;
            _repository = repository;
            _orderRepository = orderRepository;
        }

        [HttpGet("customers")]
        public async Task<IActionResult> GetAllCustomersAsync()
        {
            var handler = new GetAllCustomersQueryHandler(_repository);
            return await ExecuteRequestAsync(new GetAllCustomersQuery(), handler);
        }
        [HttpGet("orders")]
        public async Task<IActionResult> GetAllOrdersAsync()
        {
            var handler = new GetAllServiceOrdersQueryHandler(_orderRepository);
            return await ExecuteRequestAsync(new GetAllServiceOrdersQuery(), handler);
        }
        [HttpPut("ServiceOrder/approve")]
        public async Task<IActionResult> UpdateServiceCategoryAsync(ApproveServiceOrderCommand name)
        {
            var handler = new ApproveServiceOrderCommandHandler(_orderRepository);
            return await ExecuteAsync(name, handler);
        }

        [HttpPost("ServiceCategory/create")]
        public async Task<IActionResult> CreateServiceCategoryAsync(CreateServiceCategoryCommand request)
        {
            var handler = new CreateServiceCategoryCommandHandler(_serviceRepository);
            return await ExecuteAsync(request, handler);
        }

        [HttpPut("ServiceCategory/update/{name}")]
        public async Task<IActionResult> UpdateServiceCategoryAsync(string name)
        {
            var handler = new UpdateServiceCategoryCommandHandler(_serviceRepository);
            return await ExecuteAsync(name, handler);
        }

        [HttpDelete("ServiceCategory/delete/{name}")]
        public async Task<IActionResult> DeleteServiceCategoryAsync(string name)
        {
            var handler = new DeleteServiceCategoryCommandHandler(_serviceRepository);
            return await ExecuteAsync(name, handler);
        }
        private readonly IServiceCategoryRepository _serviceRepository;
        private readonly IServiceOrderRepository _orderRepository;
        private readonly IUserRepository _repository;
    }
}
