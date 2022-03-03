using Microsoft.EntityFrameworkCore;

namespace Lytical.Artisan.Infrastructure.Services
{
    public static class DatabaseService
    {
        public static void AddDatabaseContext(this IServiceCollection services)
        {
            services.AddDbContext<ArtisanDbContext>();
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
