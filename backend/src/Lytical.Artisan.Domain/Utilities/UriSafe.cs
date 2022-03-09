using System.Text;

namespace Lytical.Artisan.Domain.Utilities;
public static class UriSafe
{
    public static string EncodeToBase64String(string text)
    {
        return Convert.ToBase64String(Encoding.UTF8.GetBytes(text))
                       .TrimEnd('=').Replace('+', '-').Replace('/', '_');
    }
    public static string DecodeFromHexString(string data)
    {
        return Encoding.UTF8.GetString(Convert.FromHexString(data));
    }
    public static string EncodeToHexString(string text)
    {
        return Convert.ToHexString(Encoding.UTF8.GetBytes(text));
    }
    public static string DecodeFromBase64String(string data)
    {
        var text = data.Replace('_', '/').Replace('-', '+');
        switch (data.Length % 4)
        {
            case 2: text += "=="; break;
            case 3: text += "="; break;
        }
        return Encoding.UTF8.GetString(Convert.FromBase64String(text));
    }
}
