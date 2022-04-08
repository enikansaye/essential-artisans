namespace Lytical.Artisan.Domain.Constants
{
    public sealed class Permission
    {
        public const string READ = nameof(READ);
        public const string WRITE = nameof(WRITE);
        public const string EDIT = nameof(EDIT);
        public const string DELETE = nameof(DELETE);
    }
    public sealed class ConstantValue
    {
        public const string LOGIN = "/login";
        public const string LOGOUT = "/logout";
        public const string FORBIDDEN = "/forbidden";
        public const string COOKIE_NAME = "ac_in";
        public const string COOKIE_PATH = "/api/auth/refresh-token";
    }
}
