using Lytical.Artisan.Infrastructure.Middlewares;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace Lytical.Artisan.Infrastructure.Extensions;
public static class AuthService
{
    public static void AddAuthService(this WebApplicationBuilder builder)
    {
        builder.Services.AddSingleton<IPasswordManager, PasswordManager>()
            .AddAuthentication(auth =>
            {
                auth.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                auth.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                auth.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
          .AddJwtBearer(options => options.TokenValidationParameters = new TokenValidationParameters
          {
              ValidateIssuer = true,
              ValidateAudience = true,
              ValidateLifetime = true,
              ValidateIssuerSigningKey = true,
              RequireExpirationTime = true,
              ClockSkew = TimeSpan.Zero,
              ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
              ValidAudience = builder.Configuration["JwtSettings:Audience"],
              IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:SecretKey"])),
          });
    }

    public static void UseArtisanAuth(this WebApplication app)
    {
        // global error handler
        app.UseMiddleware<ErrorMiddleware>();

        // custom jwt auth middleware
        app.UseMiddleware<JwtMiddleware>();
    }
}
