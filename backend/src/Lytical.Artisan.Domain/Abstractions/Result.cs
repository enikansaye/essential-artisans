namespace Lytical.Artisan
{
    public class Result
    {
        public Result(bool isSuccess, string message = null)
        {
            Succeeded = isSuccess;
            Status = message;
        }

        public bool Succeeded { get; set; }
        public bool NotSucceeded => !Succeeded;
        public string Status { get; set; }
    }

    public class Result<TResult> : Result
    {
        public Result(TResult result, bool isSuccess, string message = null) : base(isSuccess, message) => Data = result;
        public Result(bool isSuccess, string message = null) : base(isSuccess, message) { }
        public TResult Data { get; }
    }
}
