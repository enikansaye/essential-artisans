using Microsoft.AspNetCore.Hosting;

namespace Lytical.Artisan.Infrastructure.Services;
internal class FileManager : IFileManager
{
    public FileManager(IWebHostEnvironment env)
    {

    }
    public string GetFilePath(string path)
    {
        throw new NotImplementedException();
    }

    public async Task AddFileAsync(string directoryPath, string uniqueFileName)
    {
        if (!Directory.Exists(directoryPath))
        {
            Directory.CreateDirectory(directoryPath);
        }

        var imagePath = Path.Combine(directoryPath, uniqueFileName);
        using var stream = new FileStream(imagePath, FileMode.Create);
        //await file.CopyToAsync(stream);
    }

    public void RemoveFile(string path)
    {
        File.Delete(path);

        var directoryPath = Path.GetDirectoryName(path);

        var items = Directory.EnumerateDirectories(directoryPath).ToList();
        items.AddRange(Directory.EnumerateFiles(directoryPath));
        if (!items.Any())
        {
            Directory.Delete(directoryPath);
        }
    }
}
