namespace Lytical.Artisan.Application;
public interface IRequestHandler<TRequest, TResponse>
{
    Task<Result<TResponse>> HandleAsync(TRequest request);

}
public interface IRequestHandler<TRequest>
{
    Task<Result> HandleAsync(TRequest request);

}
