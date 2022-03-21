namespace Lytical.Artisan.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : BaseController
{
    public AuthController(IUserRepository repository, IEmailService email,
        IPasswordManager password, AppSettings app, JwtSettings settings,
        IAuthTokenManger token)
    {
        _repository = repository;
        _email = email;
        _password = password;
        _app = app;
        _settings = settings;
        _token = token;
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<IActionResult> RegisterAsync(SignupCommand command)
    {
        var handler = new SignupCommandHandler(_repository, _email, _password, _app);
        return await ExecuteRequestAsync(command, handler);
    }
    [AllowAnonymous]
    [HttpGet("verify-email")]
    public async Task<IActionResult> VerifyEmailAsync(string token)
    {
        var handler = new VerifyEmailCommandHandler(_repository);
        return await ExecuteAsync(token, handler);
    }
    [AllowAnonymous]
    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPasswordAsync(ForgotPasswordCommand command)
    {
        var handler = new ForgotPasswordCommandHandler(_repository, _email, _password, _app);
        return await ExecuteRequestAsync(command, handler);
    }
    [AllowAnonymous]
    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPasswordAsync(ResetPasswordCommand command)
    {
        var handler = new ResetPasswordCommandHandler(_repository, _password);
        return await ExecuteRequestAsync(command, handler);
    }

    [HttpPost("login")]
    public async Task<IActionResult> AuthenticateAsync(LoginCommand command)
    {
        if (command == null) return BadRequest("command cannot be null");

        var handler = new LoginCommandHandler(_repository, _password, _token, _settings);
        var result = await handler.HandleAsync(command);
        if (result.NotSucceeded)
            return BadRequest(result.Message);

        Response.Cookies.Append(ConstantValue.COOKIE_NAME, result.Data.RefreshToken, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Lax,
            Expires = DateTime.UtcNow.AddMinutes(_settings.RefreshExpiration),
            IsEssential = true,
            Path = ConstantValue.COOKIE_PATH
        });
        return Ok(result);

    }

    [HttpPost("refresh-token")]
    public async Task<IActionResult> RefreshTokenAsync()
    {
        var command = new RefreshTokenCommand()
        {
            Token = Request.Cookies[ConstantValue.COOKIE_NAME]
        };
        var handler = new RefreshTokenCommandHandler(_repository, _token, _settings);
        var result = await handler.HandleAsync(command);
        if (result.NotSucceeded)
            return BadRequest(result.Message);

        Response.Cookies.Append(ConstantValue.COOKIE_NAME, result.Data.RefreshToken, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Lax,
            Expires = DateTime.UtcNow.AddMinutes(_settings.RefreshExpiration),
            IsEssential = true
        });
        return Ok(result);
    }

    [Authorize]
    [HttpDelete("logout")]
    public async Task<IActionResult> LogoutAsync()
    {
        var idString = User.FindFirstValue(ClaimTypes.PrimarySid);

        var vaild = int.TryParse(idString, out var userId);

        if (vaild.IsFalse()) return Unauthorized();

        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

        var handler = new LogoutCommandHandler(_repository);
        return await ExecuteRequestAsync(new LogoutCommand(userId), handler);
    }

    private readonly IUserRepository _repository;
    private readonly IEmailService _email;
    private readonly IPasswordManager _password;
    private readonly IAuthTokenManger _token;
    private readonly AppSettings _app;
    private readonly JwtSettings _settings;
}
