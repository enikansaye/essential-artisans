namespace Lytical.Artisan.Application.Commands
{
    public class RefreshTokenCommand
    {
        public Result<LoginDto> Validate()
        {
            if (Token.IsNotValidString())
                return ResultStatus<LoginDto>.Fail(ErrorCode.InvalidRefreshToken.Message);

            return ResultStatus<LoginDto>.Pass();

        }
        public string Token { get; set; }
        public string IpAddress { get; set; }

    }
}
