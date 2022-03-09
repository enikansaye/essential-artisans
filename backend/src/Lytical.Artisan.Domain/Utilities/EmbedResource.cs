
using System.Reflection;

namespace Lytical.Artisan.Domain.Utilities;
public static class EmbedResource
{
    public static string Extract(string fileName)
    {
        var assembly = Assembly.GetCallingAssembly();

        var resourceName = assembly.GetManifestResourceNames()
                                    .Single(str => str.EndsWith(fileName));

        using var stream = assembly.GetManifestResourceStream(resourceName);
        using StreamReader reader = new(stream);
        return reader.ReadToEnd();
    }
}
