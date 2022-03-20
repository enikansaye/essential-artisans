namespace Lytical.Artisan.Infrastructure.Filters
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class AuthorizeArtisanAttribute : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            if (context.HttpContext.User.HasClaim(c => c.Value == AccountType.ARTISAN.ToString()).IsFalse())
            {   // not logged in or role not authorized

                context.HttpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
                context.HttpContext.Response.ContentType = "application/json";
                context.Result = new JsonResult(new { StatusCode = StatusCodes.Status401Unauthorized, Message = "Unauthorized. Required Artisan account type." });
            }

        }
    }
}
