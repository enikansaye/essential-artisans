
namespace Lytical.Artisan.Infrastructure.Extensions
{
    public static class DatabaseExt
    {
        public static void AddDatabaseContext(this IServiceCollection services)
        {
            services.AddDbContext<ArtisanDbContext>();
            services.AddScoped<IDbContext, ArtisanDbContext>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();
        }

        /// <summary>
        /// Add this after the is build: var app = builder.Build();
        /// </summary>
        /// <param name="services"></param>
        public static void UseMigration(this WebApplication app)
        {
            // migrate any database changes on startup (includes initial db creation)
            using (var scope = app.Services.CreateScope())
            {
                var dataContext = scope.ServiceProvider.GetRequiredService<ArtisanDbContext>();
                dataContext.Database.Migrate();
            }
        }
    }
}
