namespace Lytical.Artisan.Application;
public interface IRequest<TResponse>
{
    Result<TResponse> Validate();
}

public interface IRequest
{
    Result Validate();
}
