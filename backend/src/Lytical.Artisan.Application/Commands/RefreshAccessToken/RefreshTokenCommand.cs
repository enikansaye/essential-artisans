namespace Lytical.Artisan.Application.Commands
{
    public class RefreshTokenCommand
    {
        public Result<LoginDto> Validate()
        {
            if (Token.IsNotValidString())
                return ResultStatus<LoginDto>.Fail("Invalid refresh token");

            return ResultStatus<LoginDto>.Pass();

        }
        public string Token { get; set; }

    }
}
