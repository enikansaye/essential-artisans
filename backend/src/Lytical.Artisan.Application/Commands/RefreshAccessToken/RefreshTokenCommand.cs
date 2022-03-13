namespace Lytical.Artisan.Application.Commands
{
    public class RefreshTokenCommand
    {
        public Result<LoginDto> Validate()
        {
            if (Token.IsNotValidString())
                return ResultStatus<LoginDto>.Fail(HttpStatusCode.Unauthorized, "Invalid refresh token");

            return ResultStatus<LoginDto>.Pass(HttpStatusCode.OK);

        }
        public string Token { get; set; }

    }
}
