namespace Lytical.Artisan.Domain.Services;
public interface IFileManager
{
    string GetFilePath(string path);
    Task AddFileAsync(string directoryPath, string uniqueFileName);
    void RemoveFile(string path);
}
