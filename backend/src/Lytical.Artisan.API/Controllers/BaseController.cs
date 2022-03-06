
namespace Lytical.Artisan.API.Controllers;
public class BaseController : ControllerBase
{
    public BaseController(IMediator mediator)
    {
        _mediator = mediator;
    }
#pragma warning disable CA1051 // Do not declare visible instance fields
#pragma warning disable IDE1006 // Naming Styles
    protected readonly IMediator _mediator;
#pragma warning restore IDE1006 // Naming Styles
#pragma warning restore CA1051 // Do not declare visible instance fields
}
