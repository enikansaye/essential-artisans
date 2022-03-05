using Microsoft.OpenApi.Models;

namespace Lytical.Artisan.API.Extensions
{
    public static class SwaggerExt
    {

        public static void AddArtisanSwagger(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "Artisan App API",
                    Description = "Artisan App .NET 6.0 Web API"
                });

                //c.SwaggerDoc("v2", new OpenApiInfo
                //{
                //    Version = "v2",
                //    Title = "Artisan App V2",
                //    Description = "Sample Web API"
                //});
                //c.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
                //{
                //    Description = "Standard Authorization header using the Bearer scheme (\"bearer {token}\")",
                //    In = ParameterLocation.Header,
                //    Name = "Authorization",
                //    Type = SecuritySchemeType.ApiKey
                //});

                //c.OperationFilter<SecurityRequirementsOperationFilter>();
            });
        }
        public static void UseArtisanSwagger(this IApplicationBuilder app)
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Artisan App v1");
                //c.SwaggerEndpoint("/swagger/v2/swagger.json", "My API V2");
            });
            app.UseDeveloperExceptionPage();
        }
    }
}
