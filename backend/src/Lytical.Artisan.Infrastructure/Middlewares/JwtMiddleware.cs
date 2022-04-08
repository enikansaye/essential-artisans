namespace Lytical.Artisan.Infrastructure.Middlewares
{
    public class JwtMiddleware
    {
        public JwtMiddleware(RequestDelegate request)
        {
            _request = request;
        }

        public async Task InvokeAsync(HttpContext context, JwtSettings settings, IAuthTokenManger service)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (token != null)
            {
                var claims = service.ValidateToken(token, settings.SecretKey);
                if (claims.Any())
                    context.User.AddIdentity(new ClaimsIdentity(claims));
            }

            await _request(context);
        }
        private readonly RequestDelegate _request;
    }
}
