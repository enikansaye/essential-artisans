using System.Net;

namespace Lytical.Artisan
{
    public class Result
    {
        public Result(bool isSuccess, HttpStatusCode code, string message = null)
        {
            Succeeded = isSuccess;
            Message = message;
            StatusCode = code;
        }

        public bool Succeeded { get; set; }
        public bool NotSucceeded => !Succeeded;
        public string Message { get; set; }
        public HttpStatusCode StatusCode { get; set; }
    }

    public class Result<TResult> : Result
    {
        public Result(TResult result, bool isSuccess, HttpStatusCode code, string message = null) : base(isSuccess, code, message) => Data = result;
        public Result(bool isSuccess, HttpStatusCode code, string message = null) : base(isSuccess, code, message) { }
        public TResult Data { get; }
    }
}
