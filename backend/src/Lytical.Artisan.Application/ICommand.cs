namespace Lytical.Artisan.Application
{
    public interface ICommand : IRequest
    {
    }
    public interface ICommandHandler<TRequest> : IRequestHandler<TRequest> where TRequest : IRequest<Unit>
    {
    }
    public interface ICommand<TRequest> : IRequest<TRequest>
    {
    }

    public interface ICommandHandler<TRequest, TResponse> : IRequestHandler<TRequest, TResponse> where TRequest : IRequest<TResponse>
    {
    }
}
