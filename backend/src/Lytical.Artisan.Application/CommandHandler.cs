
using Lytical.Artisan.Domain.Abstractions;

namespace Lytical.Artisan.Application
{
    public abstract class CommandHandler<TCommand, TResponse> : ICommandHandler<TCommand, Result<TResponse>> where TCommand : ICommand<TResponse>
    {
        public abstract Task<Result<TResponse>> HandleAsync(TCommand command);

        protected Result<TResponse> InValidate(ICommand<TResponse> command, IDataAccess dataAccess)
        {
            if (dataAccess == null) return ResultStatus<TResponse>.Fail("DbContext cannot be null");

            if (command == null) return ResultStatus<TResponse>.Fail("command cannot be null");

            var validation = command.Validate();
            if (validation.NotSucceeded) return ResultStatus<TResponse>.Fail(validation.Status);

            return ResultStatus<TResponse>.Pass();
        }
    }

    public abstract class CommandHandler<TCommand> : ICommandHandler<TCommand> where TCommand : ICommand
    {
        public abstract Task<Result> HandleAsync(TCommand command);

        protected Result InValidate(ICommand command, IDataAccess dataAccess)
        {
            if (dataAccess == null) return ResultStatus.Fail("DbContext cannot be null");

            if (command == null) return ResultStatus.Fail("command cannot be null");

            var validation = command.Validate();
            if (validation.NotSucceeded) return ResultStatus.Fail(validation.Status);

            return ResultStatus.Pass();
        }
    }
}
