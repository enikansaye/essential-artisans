using FluentEmail.MailKitSmtp;

namespace Lytical.Artisan.Infrastructure.Extensions
{
    public static class EmailExt
    {
        public static void AddEmailService(this WebApplicationBuilder builder)
        {
            builder.Services.AddFluentEmail(builder.Configuration["Email:User"], builder.Configuration["Email:From"])
                            .AddMailKitSender(new SmtpClientOptions
                            {
                                Server = builder.Configuration["Email:Server"],
                                Port = int.Parse(builder.Configuration["Email:Port"]),
                                User = builder.Configuration["Email:User"],
                                Password = builder.Configuration["Email:Password"],
                                UseSsl = true,
                                RequiresAuthentication = true
                            });
            builder.Services.AddScoped<IEmailService, EmailService>();
        }
    }
}
