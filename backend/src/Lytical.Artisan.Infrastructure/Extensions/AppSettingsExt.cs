using Microsoft.Extensions.Configuration;

namespace Lytical.Artisan.Infrastructure.Extensions
{
    public static class AppSettingsExt
    {
        public static void AddArtisanSettings(this WebApplicationBuilder builder)
        {
            builder.Services.AddSingleton(builder.Configuration.GetSection(nameof(JwtSettings)).Get<JwtSettings>())
                            .Configure<CookiePolicyOptions>(options =>
                            {
                                options.CheckConsentNeeded = context => true;
                                options.MinimumSameSitePolicy = SameSiteMode.None;
                                options.HttpOnly = HttpOnlyPolicy.Always;
                                options.Secure = CookieSecurePolicy.Always;
                            });
        }
    }
}
