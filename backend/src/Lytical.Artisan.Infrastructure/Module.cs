﻿
namespace Lytical.Artisan.Infrastructure;

public static class Module
{
    public static void AddArtisanModules(this WebApplicationBuilder builder)
    {
        builder.AddAuthService();
        builder.Services.AddScoped<ITokenService, JwtService>();
        builder.Services.AddDatabaseContext();
    }

    public static void UseArtisanModules(this WebApplication app)
    {
        app.UseMigration();
        app.UseArtisanAuth();
    }
}