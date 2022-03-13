using Lytical.Artisan.Domain.Constants;

namespace Lytical.Artisan.API.Controllers
{
    public class BaseController : ControllerBase
    {
        protected async Task<IActionResult> ExecuteCommandAsync<TCommand>(TCommand command, ICommandHandler<TCommand> handler) where TCommand : ICommand
        {
            if (command == null) return GetResult(HttpStatusCode.BadRequest, "command cannot be null");

            var validate = command.Validate();
            if (validate.NotSucceeded)
                return GetResult(validate.StatusCode, validate.Message);

            var result = await handler.HandleAsync(command);
            if (result.NotSucceeded)
                return GetResult(result.StatusCode, result.Message);

            return GetResult(result.StatusCode, result.Message);
        }
        protected async Task<IActionResult> ExecuteAsync<TCommand>(TCommand command, ICommandHandler<TCommand> handler) //where TCommand : ICommand
        {
            if (command == null) return GetResult(HttpStatusCode.BadRequest, "command cannot be null");

            var result = await handler.HandleAsync(command);
            if (result.NotSucceeded)
                return GetResult(result.StatusCode, result.Message);

            return GetResult(result.StatusCode, result.Message);
        }
        protected async Task<IActionResult> ExecuteCommandAsync<TCommand, TResponse>(TCommand command, ICommandHandler<TCommand, TResponse> handler) where TCommand : ICommand<TResponse>
        {
            if (command == null) return GetResult(HttpStatusCode.BadRequest, "command cannot be null");

            var validate = command.Validate();
            if (validate.NotSucceeded)
                return GetResult(validate.StatusCode, validate.Message);

            var result = await handler.HandleAsync(command);
            if (result.NotSucceeded)
                return GetResult(result.StatusCode, result.Message);

            return GetResult(result.StatusCode, result.Data);
        }
        protected async Task<IActionResult> ExecuteAsync<TCommand, TResponse>(TCommand command, ICommandHandler<TCommand, TResponse> handler) //where TCommand : ICommand<TResponse>
        {
            if (command == null) return GetResult(HttpStatusCode.BadRequest, "command cannot be null");

            var result = await handler.HandleAsync(command);
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
