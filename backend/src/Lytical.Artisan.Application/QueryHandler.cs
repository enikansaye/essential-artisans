namespace Lytical.Artisan.Application
{
    public abstract class QueryHandler<TQuery, TResponse> : IQueryHandler<TQuery, Result<TResponse>> where TQuery : IQuery<TResponse>
    {
        public abstract Task<Result<TResponse>> HandleAsync(TQuery request);
    }

}
