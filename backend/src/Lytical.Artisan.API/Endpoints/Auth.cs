using System.Security.Claims;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;

namespace Lytical.Artisan.API.Endpoints
{
    public class Auth
    {
        //[HttpPost("login")]
        //[AllowAnonymous]
        //public async Task<IActionResult> LoginAsync([FromBody] LoginCommand loginCommand, [FromServices] IApplication application)
        //{
        //    var loginResult = await application
        //        .ExecuteCommandAsync<AdminModule, LoginCommand, LoginDto>(loginCommand);

        //    if (loginResult.WasSuccesful)
        //    {
        //          public List<Claim> Claims => new List<Claim>()
        //{
        //    new Claim(ClaimTypes.Name, Email),
        //    new Claim(ClaimTypes.Email, Email),
        //    new Claim("Token", Token),
        //    new Claim(ClaimTypes.Sid, UserId.ToString()),
        //    new Claim(ClaimTypes.Role, AccountType)
        //};
        //var dto = loginResult.Data;
        //        var principalUser = new ClaimsPrincipal(
        //            new ClaimsIdentity(dto.Claims, CookieAuthenticationDefaults.AuthenticationScheme));

        //        // Signs in response header with cookies that cannot be accessed by javascript clients.
        //        await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principalUser);
        //    }

        //    return loginResult.ResponseResult();
        //}


        //[HttpGet("logout")]
        //[AllowAnonymous]
        //public async Task<ActionResult> LogoutAsync()
        //{
        //    await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        //    return Ok();
        //}
    }


    public class TokenAuthenticationHandler : AuthenticationHandler<TokenAuthenticationOptions>, IAuthorizationRequirement
    {
       
        public TokenAuthenticationHandler(IOptionsMonitor<TokenAuthenticationOptions> options, ILoggerFactory logger, UrlEncoder encoder, ISystemClock clock) : base(options, logger, encoder, clock)
        {
           // this.http = http;
        }

        protected override Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            //var headers = Request.Headers;
            //var token = "X-Auth-Token".GetHeaderOrCookieValue(Request);

            //if (string.IsNullOrEmpty(token))
            //{
            //    return Task.FromResult(AuthenticateResult.Fail("Token is null"));
            //}

            //bool isValidToken = false; // check token here

            //if (!isValidToken)
            //{
            //    return Task.FromResult(AuthenticateResult.Fail($"Balancer not authorize token : for token={token}"));
            //}

            var claims = new[] { new Claim("token", "JA") };
            var identity = new ClaimsIdentity(claims, nameof(TokenAuthenticationHandler));
            var ticket = new AuthenticationTicket(new ClaimsPrincipal(identity),"Schem");
            return Task.FromResult(AuthenticateResult.Success(ticket));

            //  context.Result = new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };

           // return Task.FromResult(AuthenticateResult.Success(new AuthenticationTicket());
        }
       // private readonly HttpContext http;
    }

    public class TokenAuthenticationOptions : AuthenticationSchemeOptions
    {
    }
    public class Over18Requirement : AuthorizationHandler<Over18Requirement>, IAuthorizationRequirement
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, Over18Requirement requirement)
        {
            
            return Task.FromResult(AuthenticateResult.Fail($"AuthorizationHandler not authorize token : for token="));
        }
    }

}
