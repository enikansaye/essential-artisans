namespace Lytical.Artisan.Application.Commands
{
    public class UploadServiceOrderImageCommand : IRequest
    {
        public Result Validate()
        {
            if (FileNames.NotAny())
                return ResultStatus.Fail(HttpStatusCode.BadRequest, "A valid file is required.");
            if (OrderId.IsNotValidId())
                return ResultStatus.Fail(HttpStatusCode.BadRequest, "A valid order id is required.");
            return ResultStatus.Pass(HttpStatusCode.OK);
        }
        public int OrderId { get; set; }
        public IEnumerable<string> FileNames { get; set; }
    }
}
