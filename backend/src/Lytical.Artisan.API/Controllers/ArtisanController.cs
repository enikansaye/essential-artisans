namespace Lytical.Artisan.API.Controllers
{
    [Route("api/[controller]")]
    [AuthorizeArtisan]
    [ApiController]
    public class ArtisanController : BaseController
    {
        public ArtisanController(IUserRepository repository, IWebHostEnvironment env)
        {
            _repository = repository;
            _env = env;
        }
        [HttpGet("profile")]
        public async Task<IActionResult> GetArtisanProfileAsync(int id)
        {
            var handler = new GetArtisanProfileQueryHandler(_repository);
            return await ExecuteRequestAsync(new GetArtisanProfileQuery(id), handler);
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllArtisansAsync()
        {
            var handler = new GetAllArtisansQueryHandler(_repository);
            return await ExecuteRequestAsync(new GetAllArtisansQuery(), handler);
        }
        [HttpPatch("update")]
        public async Task<IActionResult> UpdateArtisanProfileAsync(UpdateArtisanCommand request)
        {
            var handler = new UpdateArtisanCommandHandler(_repository);
            return await ExecuteRequestAsync(request, handler);
        }
        [HttpPost("upload-profile-image")]
        public async Task<IActionResult> UploadProfileImageAsync(IFormFile file)
        {
            var idString = User.FindFirstValue(ClaimTypes.PrimarySid);

            var vaild = int.TryParse(idString, out var userId);

            if (vaild.IsFalse()) return Unauthorized();

            var fileManager = new FileManager(_env, file);
            var handler = new UploadProfileImageCommandHandler(fileManager, _repository);
            return await ExecuteRequestAsync(new UploadProfileImageCommand(userId), handler);
        }
        private readonly IUserRepository _repository;
        private readonly IWebHostEnvironment _env;

    }
}
