using Microsoft.Extensions.Configuration;

namespace Lytical.Artisan.Infrastructure.Extensions
{
    public static class AppSettingsExt
    {
        public static void AddArtisanSettings(this WebApplicationBuilder builder)
        {
            builder.Services.AddSingleton(builder.Configuration.GetSection(nameof(JwtSettings)).Get<JwtSettings>())
                            .AddSingleton(builder.Configuration.GetSection(nameof(AppSettings)).Get<AppSettings>())
                            .Configure<CookiePolicyOptions>(options =>
                            {
                                options.ConsentCookie.IsEssential = true;
                                options.CheckConsentNeeded = context => false;
                                options.MinimumSameSitePolicy = SameSiteMode.None;
                                options.HttpOnly = HttpOnlyPolicy.Always;
                                options.Secure = CookieSecurePolicy.Always;
                            });
        }
    }
}
