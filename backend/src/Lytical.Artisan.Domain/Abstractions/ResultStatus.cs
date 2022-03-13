using System.Net;

namespace Lytical.Artisan
{
    public static class ResultStatus
    {
        public static Result Pass(HttpStatusCode code, string message = null) => new(true, code, message);
        public static Result Fail(HttpStatusCode code, string error) => new(false, code, error);
    }

    public static class ResultStatus<TResult>
    {
        public static Result<TResult> Pass(TResult response, HttpStatusCode code, string message = null) => new(response, true, code, message);
        public static Result<TResult> Pass(HttpStatusCode code, string message = null) => new(true, code, message);
        public static Result<TResult> Fail(HttpStatusCode code, string error) => new(false, code, error);
    }
}
