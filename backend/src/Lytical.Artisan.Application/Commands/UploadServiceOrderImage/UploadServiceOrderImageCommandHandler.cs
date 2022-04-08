
using Lytical.Artisan.Domain.Enums;

namespace Lytical.Artisan.Application.Commands
{
    public class UploadServiceOrderImageCommandHandler : IRequestHandler<UploadServiceOrderImageCommand>
    {
        public UploadServiceOrderImageCommandHandler(IServiceOrderRepository repository, IFileManager file)
        {
            _repository = repository;
            _file = file;
        }
        public async Task<Result> HandleAsync(UploadServiceOrderImageCommand request)
        {
            var order = await _repository.FindbyIdAsync(request.OrderId);

            if (order == null)
                return ResultStatus.Fail(HttpStatusCode.BadRequest, "Service order does not exists.");

            if (order.IsApproved)
                return ResultStatus.Fail(HttpStatusCode.BadRequest, "Cannot update Order. Service order has been approved.");


            foreach (var item in request.FileNames)
            {
                var filePath = await _file.AddFileAsync(item, FileType.IMG, FileSize.MB2);
                order.AddFile(new OrderMediaFile(order)
                {
                    FileName = item,
                    FilePath = filePath
                });

            }

            var dbOperation = await _repository.UpdateAsync(order);
            if (dbOperation.IsFalse()) return ResultStatus.Fail(HttpStatusCode.InternalServerError, ErrorCode.FaultWhileSavingToDatabase.Message);

            return ResultStatus.Pass(HttpStatusCode.OK);
        }
        private readonly IFileManager _file;
        private readonly IServiceOrderRepository _repository;
    }
}
