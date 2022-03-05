using System.Net;
using Lytical.Artisan.Domain.Exceptions;
using Microsoft.Extensions.Logging;

namespace Lytical.Artisan.Infrastructure.Middlewares
{
    public class ErrorMiddleware
    {
        public ErrorMiddleware(RequestDelegate request, ILogger<ErrorMiddleware> logger)
        {
            _request = request;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _request(context);
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, exception.Message);
                await HandleExceptionAsync(context, exception);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var errorCode = nameof(HttpStatusCode.InternalServerError);
            var statusCode = HttpStatusCode.InternalServerError;
            var message = exception.Message;

            switch (exception)
            {
                case ArtisanException artisanException:
                    statusCode = artisanException.ErrorCode.StatusCode;
                    errorCode = artisanException.ErrorCode.Message;
                    message = string.IsNullOrEmpty(artisanException.Message) ? errorCode : artisanException.Message;
                    break;
                case UnauthorizedAccessException:
                    errorCode = nameof(HttpStatusCode.Unauthorized);
                    statusCode = HttpStatusCode.Unauthorized;
                    break;
                case KeyNotFoundException:
                    errorCode = nameof(HttpStatusCode.NotFound);
                    statusCode = HttpStatusCode.NotFound;
                    break;
            }


            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)statusCode;

            await context.Response.WriteAsJsonAsync(new { statusCode, errorCode, message });
        }

        private readonly RequestDelegate _request;
        private readonly ILogger _logger;

    }
}
