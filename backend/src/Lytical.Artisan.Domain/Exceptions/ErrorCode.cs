using System.Net;

namespace Lytical.Artisan.Domain.Exceptions
{
    public class ErrorCode
    {
        public ErrorCode(string errorCodeName, string message, HttpStatusCode statusCode = HttpStatusCode.BadRequest)
        {
            ErrorCodeName = errorCodeName;
            Message = message;
            StatusCode = statusCode;
        }

        public ErrorCode(string errorCodeName, HttpStatusCode statusCode = HttpStatusCode.BadRequest)
            : this(errorCodeName, errorCodeName, statusCode)
        {
        }

        public static ErrorCode GenericNotExist(Type type, string message = null)
        {
            return new($"{type.Name} NotExist", message);
        }

        public static ErrorCode InvalidUserCredentials => new(nameof(InvalidUserCredentials),
            "Invalid email or password", HttpStatusCode.UnprocessableEntity);

        public static ErrorCode InvalidUserClaimName =>
            new(nameof(InvalidUserClaimName), HttpStatusCode.Unauthorized);

        public static ErrorCode InvalidRefreshToken => new(nameof(InvalidRefreshToken));

        public static ErrorCode EmailExistInDatabase =>
            new(nameof(EmailExistInDatabase), "Email already exist in our database.");

        public static ErrorCode InvalidEmailConfirmationToken =>
       new(nameof(InvalidEmailConfirmationToken), "Provided token is invalid.");
        public static ErrorCode ProductNotAcceptCharms => new(nameof(ProductNotAcceptCharms));

        public static ErrorCode EmailTemplateNotExists(string name)
        {
            return new($"{nameof(EmailTemplateNotExists)}_{name}");
        }

        public static ErrorCode AccessDenied => new(nameof(AccessDenied), HttpStatusCode.Forbidden);

        public static ErrorCode EmptyImageFile => new(nameof(EmptyImageFile));

        public static ErrorCode InvalidId => new(nameof(InvalidId));

        public static ErrorCode AccessingDeactivatedUser => new(nameof(AccessingDeactivatedUser));

        public static ErrorCode InvalidChangePasswordToken =>
            new(nameof(InvalidChangePasswordToken), "Provided token is invalid.");
        public static ErrorCode OrderNotFound => new(nameof(OrderNotFound), HttpStatusCode.NotFound);
        public static ErrorCode ServiceNotFound => new(nameof(ServiceNotFound), HttpStatusCode.NotFound);
        public static ErrorCode ErroWhileSavingToDatabase => new(nameof(ErroWhileSavingToDatabase), HttpStatusCode.InternalServerError);
        public static ErrorCode PaymentDoesNotExists => new(nameof(PaymentDoesNotExists));

        public static ErrorCode InvalidPaymentType => new(nameof(InvalidPaymentType));

        public override string ToString()
        {
            return $"{ErrorCodeName}: StatusCode: '{StatusCode}', Message: '{Message}'.";
        }

        public string ErrorCodeName { get; set; }

        public string Message { get; set; }

        public HttpStatusCode StatusCode { get; set; }
    }
}
