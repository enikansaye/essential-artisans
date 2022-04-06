namespace Lytical.Artisan.API.Controllers
{
    [Route("api/[controller]")]
    [AllowArtisan]
    [ApiController]
    public class ArtisanController : BaseController
    {
        public ArtisanController(IUserRepository repository, IServiceCategoryRepository serviceRepository,
                                    IWebHostEnvironment env)
        {
            _repository = repository;
            _env = env;
            _serviceRepository = serviceRepository;
        }
        [AllowArtisan]
        [HttpGet("profile")]
        public async Task<IActionResult> GetArtisanProfileAsync(int id)
        {
            var handler = new GetArtisanProfileQueryHandler(_repository);
            return await ExecuteRequestAsync(new GetArtisanProfileQuery(id), handler);
        }
        [AllowAnonymous]
        [HttpGet("all")]
        public async Task<IActionResult> GetAllArtisansAsync()
        {
            var handler = new GetAllArtisansQueryHandler(_repository);
            return await ExecuteRequestAsync(new GetAllArtisansQuery(), handler);
        }
        [AllowArtisan]
        [HttpPut("update")]
        public async Task<IActionResult> UpdateArtisanProfileAsync(UpdateArtisanCommand request)
        {
            var handler = new UpdateArtisanCommandHandler(_repository, _serviceRepository);
            return await ExecuteRequestAsync(request, handler);
        }
        [AllowArtisan]
        [HttpPost("upload-profile-image")]
        public async Task<IActionResult> UploadProfileImageAsync(IFormFile file)
        {
            var idString = User.FindFirstValue(ClaimTypes.PrimarySid);

            var vaild = int.TryParse(idString, out var userId);

            if (vaild.IsFalse()) return Unauthorized();

            if (file is null || file.Length == 0 || string.IsNullOrEmpty(file.FileName))
                return BadRequest();

            var fileManager = new FileManager(_env, file);
            var handler = new UploadProfileImageCommandHandler(fileManager, _repository);
            return await ExecuteRequestAsync(new UploadProfileImageCommand(userId), handler);
        }
        private readonly IUserRepository _repository;
        private readonly IServiceCategoryRepository _serviceRepository;
        private readonly IWebHostEnvironment _env;

    }
}
