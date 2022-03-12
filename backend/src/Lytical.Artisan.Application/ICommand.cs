namespace Lytical.Artisan.Application
{
    public interface ICommand<TResponse>
    {
        Result<TResponse> Validate();
    }

    public interface ICommand
    {
        Result Validate();
    }

    public interface ICommandHandler<TCommand, TResponse>
    {
        Task<Result<TResponse>> HandleAsync(TCommand command);

    }
    public interface ICommandHandler<TCommand>
    {
        Task<Result> HandleAsync(TCommand command);

    }
}
