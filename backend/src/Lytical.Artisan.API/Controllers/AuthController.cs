namespace Lytical.Artisan.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : BaseController
{
    public AuthController(IMediator mediator) : base(mediator)
    {
    }

    [HttpPost("login")]
    public async Task<IActionResult> AuthenticateAsync()
    {
        await _mediator.Send(new RegisterCommand());
        // var response = _accountService.Authenticate(model, GetIPAddress());
        // SetTokenCookie(response.RefreshToken);
        //  return Ok(response);
        var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, "John"),
            };
        var principalUser = new ClaimsPrincipal(
            new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme));
        await Response.HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principalUser);

        return Ok();
    }

    [HttpPost("refresh-token")]
    public ActionResult<LoginDto> RefreshToken()
    {
        // var refreshToken = Request.Cookies["refreshToken"];
        //  var response = _accountService.RefreshToken(refreshToken, GetIPAddress());
        // SetTokenCookie(response.RefreshToken);
        //   return Ok(response);
        return Ok();
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public IActionResult Register(RegisterCommand command)
    {
        return Ok(new { message = "Registration successful, please check your email for verification instructions", a = command });
    }

    [AllowAnonymous]
    [HttpPost("verify-email")]
    public IActionResult VerifyEmail(VerifyEmailCommand command)
    {
        return Ok(new { message = "Verification successful, you can now login", a = command });
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
    [AuthorizeRole]
    [HttpPost("logout")]
    public IActionResult Logout()
    {
        //TODO: Take this to handler
        //string idString = http.User.FindFirst(ClaimTypes.NameIdentifier).Value;

        //bool vaild = Guid.TryParse(idString, out Guid userId);
        //if (vaild.IsFalse()) return Results.Unauthorized();

        //await((AccountDbContext)dbContext).RefreshTokenRepository.RemoveAsync(userId);

        return NoContent(); //TODO: Redirect to login html page
    }

    [AuthorizeRole]
    [HttpGet]
    public ActionResult<IEnumerable<LoginDto>> GetAll()
    {
        return Ok();
    }
    // helper methods

    private void SetTokenCookie(string token, JwtSettings settings)
    {
        Response.Cookies.Append("access_token", token, new CookieOptions
        {
            HttpOnly = true,
            SameSite = SameSiteMode.Lax,
            Expires = DateTime.UtcNow.AddDays(settings.RefreshExpiration)
        });
    }

    private string GetIPAddress()
    {
        if (Request.Headers.ContainsKey("X-Forwarded-For"))
            return Request.Headers["X-Forwarded-For"];
        else
            return HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString();
    }
}
