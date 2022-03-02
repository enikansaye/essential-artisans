namespace Lytical.Artisan.Domain.Exceptions
{
    public class ArtisanException : Exception
    {

        public ArtisanException(ErrorCode errorCode)
            : this(errorCode, errorCode.Message)
        {
        }

        public ArtisanException(ErrorCode errorCode, string message)
            : this(errorCode, message, null)
        {
        }

        public ArtisanException(ErrorCode errorCode, string message, Exception innerException)
            : base(message, innerException)
        {
            ErrorCode = errorCode;
        }
        public ErrorCode ErrorCode { get; set; }
    }
}
