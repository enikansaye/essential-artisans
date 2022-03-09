namespace Lytical.Artisan.Application.Commands.Register
{
    public class RegisterCommandHandler : ICommandHandler<RegisterCommand, RegisterDto>
    {
        public Task<RegisterDto> Handle(RegisterCommand request, CancellationToken cancellationToken)
        {
            return Task.FromResult(new RegisterDto());
        }
    }
}
