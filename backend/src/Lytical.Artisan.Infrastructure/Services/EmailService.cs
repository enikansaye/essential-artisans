using FluentEmail.Core;
using Lytical.Artisan.Domain.Services;
using Microsoft.Extensions.Logging;

namespace Lytical.Artisan.Infrastructure.Services
{
    public class EmailService : IEmailService
    {
        public EmailService(IFluentEmail email, ILogger<IEmailService> logger)
        {
            _email = email;
            _logger = logger;
        }

        public IEmailService To(string email, string name = null)
        {
            _email.To(email, name);
            return this;
        }

        public IEmailService From(string email, string name = null)
        {
            _email.SetFrom(email, name);
            return this;
        }

        public IEmailService Subject(string subject)
        {
            _email.Subject(subject);
            return this;
        }

        public IEmailService Body(string emailBody)
        {
            _email.Body(emailBody, true);
            return this;
        }

        public async Task<bool> SendAsync()
        {
            try
            {
                var response = await _email.SendAsync();

                return response.Successful;
            }
            catch (Exception ex)
            {
                _logger.LogError("Email from sending failed.", new { ex.Message, ex?.InnerException, ex.StackTrace });
                return false;
            }
        }

        private readonly IFluentEmail _email;
        private readonly ILogger<IEmailService> _logger;
    }
}
