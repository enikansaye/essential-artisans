using Lytical.Artisan.Infrastructure;
using Lytical.Artisan.Infrastructure.Extensions;

namespace Lytical.Artisan.API.Extensions
{
    public static class ArtisanExt
    {
        public static void AddArtisanServices(this WebApplicationBuilder builder)
        {
            builder.Services.AddArtisanSwagger();
            builder.Services.AddArtisanCors();
            builder.AddArtisanSettings();
            builder.AddEmailService();
            builder.AddArtisanModules();

        }
    }
}
