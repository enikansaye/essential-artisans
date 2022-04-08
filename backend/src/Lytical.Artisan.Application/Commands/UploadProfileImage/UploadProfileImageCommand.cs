namespace Lytical.Artisan.Application.Commands
{
    public class UploadProfileImageCommand : IRequest<UploadProfileImageDto>
    {
        public UploadProfileImageCommand(int id) => UserId = id;
        public Result<UploadProfileImageDto> Validate()
        {
            if (UserId.IsNotValidId())
                return ResultStatus<UploadProfileImageDto>.Fail(HttpStatusCode.Unauthorized, "User ID is required.");

            return ResultStatus<UploadProfileImageDto>.Pass(HttpStatusCode.OK);
        }
        public int UserId { get; set; }
    }
}
