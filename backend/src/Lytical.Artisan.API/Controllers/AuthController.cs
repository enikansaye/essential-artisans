

using Lytical.Artisan.Domain.Extensions;

namespace Lytical.Artisan.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : BaseController
{
    public AuthController(IUserRepository repository, IEmailService email,
        IPasswordManager password, AppSettings app, JwtSettings settings,
        IAuthTokenManger token, IRefreshTokenRepository refresh)
    {
        _repository = repository;
        _email = email;
        _password = password;
        _app = app;
        _settings = settings;
        _token = token;
        _refreshRepo = refresh;
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<IActionResult> RegisterAsync(SignupCommand command)
    {
        var handler = new SignupCommandHandler(_repository, _email, _password, _app);
        return await ExecuteCommandAsync(command, handler);
    }
    [AllowAnonymous]
    [HttpGet("verify-email")]
    public async Task<IActionResult> VerifyEmailAsync(string token)
    {
        var handler = new VerifyEmailCommandHandler(_repository);
        return await ExecuteAsync(token, handler);
    }

    [HttpPost("login")]
    public async Task<IActionResult> AuthenticateAsync(LoginCommand command)
    {
        if (command == null) return BadRequest("command cannot be null");

        var handler = new LoginCommandHandler(_repository, _password, _token, _refreshRepo, _settings);
        command.IpAddress = GetIPAddress();
        var result = await handler.HandleAsync(command);
        if (result.NotSucceeded)
            return BadRequest(result.Message);

        var user = result.Data;

        var claims = new List<Claim>()
        {
            new Claim(ClaimTypes.PrimarySid, user.Id.ToString()),
            new Claim(ClaimTypes.SerialNumber, user.UserId.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.UserType.ToString()),
            new Claim(ClaimTypes.GivenName, user.FirstName),
            new Claim(ClaimTypes.Surname, user.LastName)
        };
        var principalUser = new ClaimsPrincipal(
            new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme));

        Response.Cookies.Append(_refreshToken, result.Data.RefreshToken, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Lax,
            Expires = DateTime.UtcNow.AddMinutes(_settings.RefreshExpiration),
            IsEssential = true
        });
        await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principalUser,
            new AuthenticationProperties
            {
                ExpiresUtc = DateTime.UtcNow.AddMinutes(15),
                IssuedUtc = DateTime.UtcNow,
                IsPersistent = false,
                AllowRefresh = false
            });
        return Ok(result);

    }

    [HttpPost("refresh-token")]
    public async Task<IActionResult> RefreshTokenAsync()
    {
        var command = new RefreshTokenCommand()
        {
            Token = Request.Cookies[_refreshToken]
        };
        var handler = new RefreshTokenCommandHandler(_repository, _token, _refreshRepo, _settings);
        var result = await handler.HandleAsync(command);
        if (result.NotSucceeded)
            return BadRequest(result.Message);

        Response.Cookies.Append(_refreshToken, result.Data.RefreshToken, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Lax,
            Expires = DateTime.UtcNow.AddMinutes(_settings.RefreshExpiration),
            IsEssential = true
        });
        return Ok(result);
    }

    [HttpPost("forgot-password")]
    public IActionResult ForgotPassword(ForgotPasswordCommand command)
    {
        return Ok(new { message = "Please check your email for password reset instructions", a = command });
    }

    [HttpPost("reset-password")]
    public IActionResult ResetPassword(ResetPasswordCommand command)
    {
        return Ok(new { message = "Password reset successful, you can now login", a = command });
    }
    [Authorize]
    [HttpDelete("logout")]
    public async Task<IActionResult> LogoutAsync(HttpContext http)
    {
        var idString = http.User.FindFirstValue(ClaimTypes.PrimarySid);

        var vaild = Guid.TryParse(idString, out var userId);

        if (vaild.IsFalse()) return Unauthorized();

        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

        var handler = new LogoutCommandHandler(_refreshRepo);
        return await ExecuteCommandAsync(new LogoutCommand(userId), handler);
    }

    [AuthorizeRole]
    [HttpGet]
    public ActionResult<IEnumerable<LoginDto>> GetAll()
    {
        return Ok();
    }
    // helper methods


    private string GetIPAddress()
    {
        if (Request.Headers.ContainsKey("X-Forwarded-For"))
            return Request.Headers["X-Forwarded-For"];
        else
            return HttpContext.Connection.RemoteIpAddress?.MapToIPv4().ToString();
    }
    private readonly IUserRepository _repository;
    private readonly IRefreshTokenRepository _refreshRepo;
    private readonly IEmailService _email;
    private readonly IPasswordManager _password;
    private readonly IAuthTokenManger _token;
    private readonly AppSettings _app;
    private readonly JwtSettings _settings;
    private readonly string _refreshToken = "refresh_token";
}
