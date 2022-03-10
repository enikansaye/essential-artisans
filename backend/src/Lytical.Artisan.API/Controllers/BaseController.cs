namespace Lytical.Artisan.API.Controllers
{
    public class BaseController : ControllerBase
    {
        protected async Task<IActionResult> ExecuteCommandAsync<TCommand>(TCommand command, ICommandHandler<TCommand> handler, HttpStatusCode errorCode, HttpStatusCode successCode) where TCommand : ICommand
        {
            var validate = command.Validate();
            if (validate.NotSucceeded)
                return GetResult(errorCode, validate.Status);

            var result = await handler.HandleAsync(command);
            if (result.NotSucceeded)
                return GetResult(errorCode, result.Status);

            return GetResult(successCode, result.Status);
        }
        protected async Task<IActionResult> ExecuteCommandAsync<TCommand, TResponse>(TCommand command, ICommandHandler<TCommand, Result<TResponse>> handler, HttpStatusCode errorCode, HttpStatusCode successCode) where TCommand : ICommand<TResponse>
        {
            var validate = command.Validate();
            if (validate.NotSucceeded)
                return GetResult(errorCode, validate.Status);

            var result = await handler.HandleAsync(command);
            if (result.NotSucceeded)
                return GetResult(errorCode, result.Status);

            return GetResult(successCode, result.Data);
        }

        private IActionResult GetResult(HttpStatusCode code, object? value = null)
        {
            return code switch
            {
                HttpStatusCode.OK => Ok(value),
                HttpStatusCode.BadRequest => BadRequest(value),
                _ => BadRequest(value),
            };
        }
    }
}
