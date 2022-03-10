namespace Lytical.Artisan.Application
{
    public interface IQueryHandler<TQuery, TResponse>
    {
        Task<TResponse> HandleAsync(TQuery request);

    }
    public interface IQueryHandler<TQuery>
    {
        Task<Result> HandleAsync(TQuery request);

    }

    public interface IQuery<TResponse>
    {
        Result<TResponse> Validate();
    }

    public interface IQuery
    {
        Result Validate();
    }

}
