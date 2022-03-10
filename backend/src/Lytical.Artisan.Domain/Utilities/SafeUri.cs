using Lytical.Artisan.Domain.Extensions;

namespace Lytical.Artisan.Domain.Utilities
{
    public static class SafeUri
    {
        public static string Encode(string uri)
        {
            if (uri.IsNotValidString())
                throw new ArgumentException("Uri cannot be null or empty.");

            return Uri.EscapeDataString(uri);
        }
        public static string Decode(string uri)
        {
            if (uri.IsNotValidString())
                throw new ArgumentException("Uri cannot be null or empty.");

            return Uri.UnescapeDataString(uri);
        }
    }

}
