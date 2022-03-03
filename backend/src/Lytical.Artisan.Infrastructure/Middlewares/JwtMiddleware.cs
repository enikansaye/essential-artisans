namespace Lytical.Artisan.Infrastructure.Middlewares
{
    public class JwtMiddleware
    {
        public JwtMiddleware(RequestDelegate request)
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
