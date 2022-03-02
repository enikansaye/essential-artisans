
namespace Lytical.Artisan.Infrastructure;

public static class AccountModule
{
    public static void AddAccountModule(this WebApplicationBuilder builder)
    {
        builder.AddAuthService();
    }
}
