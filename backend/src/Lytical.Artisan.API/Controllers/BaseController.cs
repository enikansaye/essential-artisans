using Lytical.Artisan.Domain.Constants;

namespace Lytical.Artisan.API.Controllers
{
    public class BaseController : ControllerBase
    {
        protected async Task<IActionResult> ExecuteCommandAsync<TCommand>(TCommand command, ICommandHandler<TCommand> handler, HttpStatusCode errorCode, HttpStatusCode successCode) where TCommand : ICommand
        {
           // if (dataAccess == null) return GetResult(errorCode, "DbContext cannot be null");

            if (command == null) return GetResult(errorCode, "command cannot be null");

            var validate = command.Validate();
            if (validate.NotSucceeded)
                return GetResult(errorCode, validate.Status);

            var result = await handler.HandleAsync(command);
            if (result.NotSucceeded)
                return GetResult(errorCode, result.Status);

            return GetResult(successCode, result.Status);
        }
        protected async Task<IActionResult> ExecuteAsync<TCommand>(TCommand command, ICommandHandler<TCommand> handler, HttpStatusCode errorCode, HttpStatusCode successCode) //where TCommand : ICommand
        {
           // if (dataAccess == null) return GetResult(errorCode, "DbContext cannot be null");

            if (command == null) return GetResult(errorCode, "command cannot be null");

            var result = await handler.HandleAsync(command);
            if (result.NotSucceeded)
                return GetResult(errorCode, result.Status);

            return GetResult(successCode, result.Status);
        }
        protected async Task<IActionResult> ExecuteCommandAsync<TCommand, TResponse>(TCommand command, ICommandHandler<TCommand, TResponse> handler, HttpStatusCode errorCode, HttpStatusCode successCode) where TCommand : ICommand<TResponse>
        {
           // if (dataAccess == null) return GetResult(errorCode, "DbContext cannot be null");

            if (command == null) return GetResult(errorCode, "command cannot be null");

            var validate = command.Validate();
            if (validate.NotSucceeded)
                return GetResult(errorCode, validate.Status);

            var result = await handler.HandleAsync(command);
            if (result.NotSucceeded)
                return GetResult(errorCode, result.Status);

            return GetResult(successCode, result.Data);
        }
        protected async Task<IActionResult> ExecuteAsync<TCommand, TResponse>(TCommand command, ICommandHandler<TCommand, TResponse> handler, HttpStatusCode errorCode, HttpStatusCode successCode) //where TCommand : ICommand<TResponse>
        {
           // if (dataAccess == null) return GetResult(errorCode, "DbContext cannot be null");

            if (command == null) return GetResult(errorCode, "command cannot be null");

            var result = await handler.HandleAsync(command);
            if (result.NotSucceeded)
                return GetResult(errorCode, result.Status);

            return GetResult(successCode, result.Data);
        }

        private IActionResult GetResult(HttpStatusCode code, object value = null)
        {
            return code switch
            {
                HttpStatusCode.OK => Ok(value),
                HttpStatusCode.BadRequest => BadRequest(value),
                HttpStatusCode.Unauthorized => Unauthorized(),
                HttpStatusCode.NoContent => NoContent(),
                _ => BadRequest(value),
            };
        }
    }
}
