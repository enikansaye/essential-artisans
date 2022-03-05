namespace Lytical.Artisan.API.Extensions
{
    public static class CorsExt
    {

        public static void AddArtisanCors(this IServiceCollection services)
        {
            services.AddCors(options => options.AddPolicy(name: "ArtisanApp",
                            builder => builder.WithOrigins("https://localhost:44342")));
        }

        public static void UseArtisanCors(this IApplicationBuilder app)
        {
            app.UseCors("ArtisanApp");
        }
    }
}
