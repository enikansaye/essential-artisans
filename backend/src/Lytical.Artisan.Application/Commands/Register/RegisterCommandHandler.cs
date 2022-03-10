using Lytical.Artisan.Application.Mappers;
using Lytical.Artisan.Domain.Entities;
using Lytical.Artisan.Domain.Exceptions;
using Lytical.Artisan.Domain.Repositories;
using Lytical.Artisan.Domain.Services;
using Lytical.Artisan.Domain.Utilities;

namespace Lytical.Artisan.Application.Commands.Register
{
    public class RegisterCommandHandler : CommandHandler<RegisterCommand, RegisterUserDto>
    {
        public RegisterCommandHandler(IUserRepository repository, IEmailService email, IPasswordManager password)
        {
            _repository = repository;
            _email = email;
            _password = password;
        }
        public override async Task<Result<RegisterUserDto>> HandleAsync(RegisterCommand command)
        {
            var validation = InValidate(command, _repository);
            if (validation.NotSucceeded) return ResultStatus<RegisterUserDto>.Fail(validation.Status);

            var userExists = await _repository.ExistsAsync(command.Email);
            if (userExists.NotSucceeded) return ResultStatus<RegisterUserDto>.Fail(ErrorCode.EmailExistInDatabase.Message);

            var token = _password.GenerateToken();
            var salt = _password.GenerateToken();
            var hash = _password.GetHash(command.Password, salt);

            var user = User.Create(command.Email, hash, salt);
            user.VerificationToken = token;

            var dbOperation = await _repository.AddAsync(user);
            if (dbOperation.NotSucceeded) return ResultStatus<RegisterUserDto>.Fail(dbOperation.Status);


            var emailBody = EmbedResource.Extract("EmailConfirmation.html");
            _email.To(command.Email);
            _email.Subject("Email Confirmation | BrandMify");
            _email.Body(emailBody.Replace("token=", $"token={token}"));
            var emailOperation = await _email.SendAsync();

            if (emailOperation.NotSucceeded) return ResultStatus<RegisterUserDto>.Fail("Email sending failed.");

            return ResultStatus<RegisterUserDto>.Pass(user.MapEmailDto(), "Registration successful, please check your email for verification instructions");
        }
        private readonly IUserRepository _repository;
        private readonly IEmailService _email;
        private readonly IPasswordManager _password;

    }
}
