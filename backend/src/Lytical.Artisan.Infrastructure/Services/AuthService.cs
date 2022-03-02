namespace Lytical.Artisan.Infrastructure.Services;
public static class AuthService
{
    public static void AddAuthService(this WebApplicationBuilder builder)
    {
        builder.Services.Configure<CookiePolicyOptions>(options =>
        {
            options.CheckConsentNeeded = context => true;
            options.MinimumSameSitePolicy = SameSiteMode.None;
            options.HttpOnly = HttpOnlyPolicy.Always;
            options.Secure = CookieSecurePolicy.Always;
        });
        builder.Services.AddAuthentication(auth =>
        {
            auth.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            auth.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        }).AddCookie(options =>
        {
            options.LoginPath = "/api/auth/login";
            options.LogoutPath = "/api/auth/logout";
            options.Cookie.MaxAge = TimeSpan.FromMinutes(15);
            options.ExpireTimeSpan = TimeSpan.FromMinutes(15);
            options.Cookie.HttpOnly = true;
            options.Cookie.SecurePolicy = CookieSecurePolicy.None;
            options.Cookie.SameSite = SameSiteMode.Lax;
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
              IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:Key"])),
          });
    }
}
