namespace Lytical.Artisan.API.Controllers
{
    [Route("api/[controller]")]
    [AllowCustomer]
    [ApiController]
    public class CustomerController : BaseController
    {
        public CustomerController(IUserRepository repository, IServiceOrderRepository orderRepository, IWebHostEnvironment env)
        {
            _repository = repository;
            _orderRepository = orderRepository;
            _env = env;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCustomerProfileAsync()
        {
            var idString = User.FindFirstValue(ClaimTypes.PrimarySid);

            var vaild = int.TryParse(idString, out var userId);

            if (vaild.IsFalse()) return Unauthorized();
            var handler = new GetCustomerProfileQueryHandler(_repository);
            return await ExecuteRequestAsync(new GetCustomerProfileQuery(userId), handler);
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateCustomerProfileAsync(UpdateUserCommand request)
        {
            var handler = new UpdateCustomerCommandHandler(_repository);
            return await ExecuteRequestAsync(request, handler);
        }

        [HttpPost("ServiceOrder/create")]
        public async Task<IActionResult> CreateServiceOrderAsync(CreateServiceOrderCommand request)
        {
            var idString = User.FindFirstValue(ClaimTypes.PrimarySid);

            var vaild = int.TryParse(idString, out var userId);

            if (vaild.IsFalse()) return Unauthorized();

            request.CustomerId = userId;
            var handler = new CreateServiceOrderCommandHandler(_orderRepository, _repository);
            return await ExecuteRequestAsync(request, handler);
        }

        [HttpPost("ServiceOrder/upload")]
        public async Task<IActionResult> UploadFilesAsync(int orderId, IFormFileCollection files)
        {
            if (files is null || files.NotAny())
                return BadRequest();

            var command = new UploadServiceOrderImageCommand
            {
                OrderId = orderId,
                FileNames = files.Select(f => f.FileName)
            };
            var fileManager = new FileManager(_env, files[0]);
            var handler = new UploadServiceOrderImageCommandHandler(_orderRepository, fileManager);
            return await ExecuteRequestAsync(command, handler);
        }
        [HttpPut("ServiceOrder/update")]
        public async Task<IActionResult> UpdateServiceOrderAsync(UpdateServiceOrderCommand request)
        {
            var idString = User.FindFirstValue(ClaimTypes.PrimarySid);

            var vaild = int.TryParse(idString, out var userId);

            if (vaild.IsFalse()) return Unauthorized();

            request.CustomerId = userId;
            var handler = new UpdateServiceOrderCommandHandler(_orderRepository, _repository);
            return await ExecuteRequestAsync(request, handler);
        }
        [HttpDelete("ServiceOrder/delete")]
        public async Task<IActionResult> DeleteServiceCategoryAsync(DeleteServiceOrderCommand request)
        {
            var handler = new DeleteServiceOrderCommandHandler(_orderRepository);
            return await ExecuteRequestAsync(request, handler);
        }
        private readonly IUserRepository _repository;
        private readonly IServiceOrderRepository _orderRepository;
        private readonly IWebHostEnvironment _env;
    }
}

