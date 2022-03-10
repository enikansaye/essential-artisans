namespace Lytical.Artisan.Domain.Services
{
    public interface IEmailService
    {
        IEmailService To(string email, string name = null);
        IEmailService From(string email, string name = null);
        IEmailService Subject(string subject);
        IEmailService Body(string emailBody);
        Task<Result<bool>> SendAsync();
    }
}
