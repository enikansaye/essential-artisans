namespace Lytical.Artisan.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArtisanController : BaseController
    {
        public ArtisanController(IUserRepository repository)
        {
            _repository = repository;
        }

        [Authorize]
        [HttpGet("profile")]
        public async Task<IActionResult> GetArtisanProfileAsync(int id)
        {
            var handler = new GetArtisanProfileQueryHandler(_repository);
            return await ExecuteRequestAsync(new GetArtisanProfileQuery(id), handler);
        }
        private readonly IUserRepository _repository;
    }
}
