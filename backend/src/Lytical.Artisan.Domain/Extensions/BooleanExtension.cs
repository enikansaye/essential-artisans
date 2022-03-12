namespace Lytical.Artisan.Domain.Extensions
{
    public static class BooleanExtension
    {
        public static bool IsFalse(this bool value)
        {
            return value ? !value : value;
        }
        public static bool IsTrue(this bool value)
        {
            return value ? value : !value;
        }
    }
}
