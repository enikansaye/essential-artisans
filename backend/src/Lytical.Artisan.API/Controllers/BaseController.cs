namespace Lytical.Artisan.API.Controllers
{
    public class BaseController : ControllerBase
    {
        protected async Task<IActionResult> ExecuteRequestAsync<TRequest>(TRequest request, IRequestHandler<TRequest> handler) where TRequest : IRequest
        {
            if (request == null) return GetResult(HttpStatusCode.BadRequest, "request cannot be null");

            var validate = request.Validate();
            if (validate.NotSucceeded)
                return GetResult(validate.StatusCode, validate.Message);

            var result = await handler.HandleAsync(request);
            if (result.NotSucceeded)
                return GetResult(result.StatusCode, result.Message);

            return GetResult(result.StatusCode, result.Message);
        }
        protected async Task<IActionResult> ExecuteAsync<TRequest>(TRequest request, IRequestHandler<TRequest> handler) //where TRequest : Irequest
        {
            if (request == null) return GetResult(HttpStatusCode.BadRequest, "request cannot be null");

            var result = await handler.HandleAsync(request);
            if (result.NotSucceeded)
                return GetResult(result.StatusCode, result.Message);

            return GetResult(result.StatusCode, result.Message);
        }
        protected async Task<IActionResult> ExecuteRequestAsync<TRequest, TResponse>(TRequest request, IRequestHandler<TRequest, TResponse> handler) where TRequest : IRequest<TResponse>
        {
            if (request == null) return GetResult(HttpStatusCode.BadRequest, "request cannot be null");

            var validate = request.Validate();
            if (validate.NotSucceeded)
                return GetResult(validate.StatusCode, validate.Message);

            var result = await handler.HandleAsync(request);
            if (result.NotSucceeded)
                return GetResult(result.StatusCode, result.Message);

            return GetResult(result.StatusCode, result.Data);
        }
        protected async Task<IActionResult> ExecuteAsync<TRequest, TResponse>(TRequest request, IRequestHandler<TRequest, TResponse> handler) //where TRequest : Irequest<TResponse>
        {
            if (request == null) return GetResult(HttpStatusCode.BadRequest, "request cannot be null");

            var result = await handler.HandleAsync(request);
            if (result.NotSucceeded)
                return GetResult(result.StatusCode, result.Message);

            return GetResult(result.StatusCode, result.Data);
        }
        private IActionResult GetResult(HttpStatusCode code, object value = null)
        {
            return code switch
            {
                HttpStatusCode.OK => Ok(value),
                HttpStatusCode.BadRequest => BadRequest(value),
                HttpStatusCode.Unauthorized => Unauthorized(),
                HttpStatusCode.NoContent => NoContent(),
                HttpStatusCode.Conflict => Conflict(value),
                HttpStatusCode.Forbidden => Forbid(),
                _ => BadRequest(value),
            };
        }
    }
}
