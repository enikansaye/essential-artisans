namespace Lytical.Artisan.Application.Commands
{
    public class UploadProfileImageCommandHandler : IRequestHandler<UploadProfileImageCommand, UploadProfileImageDto>
    {
        public UploadProfileImageCommandHandler(IFileManager file, IUserRepository repository)
        {
            _file = file;
            _repository = repository;
        }
        public async Task<Result<UploadProfileImageDto>> HandleAsync(UploadProfileImageCommand request)
        {
            var user = await _repository.FindArtisanByIdAsync(request.UserId);

            if (user == null)
                return ResultStatus<UploadProfileImageDto>.Fail(HttpStatusCode.Unauthorized, "Account does not exists or requires email varification.");

            user.ProfileImage = await _file.GetFileAsync(Domain.Enums.FileSize.MB2);

            var dbOperation = await _repository.UpdateAsync(user);
            if (dbOperation.IsFalse()) return ResultStatus<UploadProfileImageDto>.Fail(HttpStatusCode.InternalServerError, ErrorCode.FaultWhileSavingToDatabase.Message);

            return ResultStatus<UploadProfileImageDto>.Pass(new UploadProfileImageDto
            {
                ProfileImage = user.ProfileImage
            }, HttpStatusCode.OK);

        }

        private readonly IFileManager _file;
        private readonly IUserRepository _repository;
    }
}
