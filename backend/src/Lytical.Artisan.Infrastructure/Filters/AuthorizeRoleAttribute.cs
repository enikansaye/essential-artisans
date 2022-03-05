using Lytical.Artisan.Domain.Constants;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Lytical.Artisan.Infrastructure.Filters
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class AuthorizeRoleAttribute : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            if (!context.HttpContext.User.HasClaim(c => c.Value == Role.AMIN))
                // not logged in or role not authorized
                context.Result = new JsonResult(new { StatusCode = StatusCodes.Status401Unauthorized, Message = "Unauthorized" });

        }
    }
}
