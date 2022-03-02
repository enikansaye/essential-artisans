﻿using System.Net;
using System.Text.Json;
using Lytical.Artisan.Domain.Exceptions;

namespace Lytical.Artisan.API.Middleware
{
    public class ExceptionHandlerMiddleware
    {
        public ExceptionHandlerMiddleware(RequestDelegate request, ILogger logger)
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

            var responseBody = JsonSerializer.Serialize(new { errorCode, message });
            await context.Response.WriteAsync(responseBody);
        }

        private readonly RequestDelegate _request;
        private readonly ILogger _logger;

    }
}
