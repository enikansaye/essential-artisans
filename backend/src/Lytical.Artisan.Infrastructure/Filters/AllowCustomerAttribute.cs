namespace Lytical.Artisan.Infrastructure.Filters
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class AllowCustomerAttribute : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            if (context.HttpContext.User.HasClaim(c => c.Value == AccountType.CUSTOMER.ToString()).IsFalse())
            {
                context.HttpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
                context.HttpContext.Response.ContentType = "application/json";
                context.Result = new JsonResult(new { StatusCode = StatusCodes.Status401Unauthorized, Message = "Unauthorized. Required Artisan account type." });
            }

        }
    }
}
