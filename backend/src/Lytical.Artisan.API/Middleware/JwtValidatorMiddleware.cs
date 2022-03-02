using System.Security.Claims;
using Lytical.Artisan.Domain.Services;
using Lytical.Artisan.Domain.Settings;

namespace Lytical.Artisan.API.Middleware
{
    public class JwtValidatorMiddleware
    {
        public JwtValidatorMiddleware(RequestDelegate request)
        {
            _request = request;
        }

        public async Task InvokeAsync(HttpContext context, JwtSettings settings, ITokenService service)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (token != null)
                context.User.AddIdentity(new ClaimsIdentity(service.ValidateToken(token, settings.SecretKey)));

            await _request(context);
        }
        private readonly RequestDelegate _request;
    }
}
