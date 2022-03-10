namespace Lytical.Artisan
{
    public static class ResultStatus
    {
        public static Result Pass(string message = null) => new(true, message);
        public static Result Fail(string error) => new(false, error);
    }

    public static class ResultStatus<TResult>
    {
        public static Result<TResult> Pass(TResult response, string message = null) => new(response, true, message);
        public static Result<TResult> Pass(string message = null) => new(true, message);
        public static Result<TResult> Fail(string error) => new(false, error);
    }
}
