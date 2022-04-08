namespace Lytical.Artisan.Domain.Services;
public interface IFileManager
{
    Task<string> AddFileAsync(string uniqueFileName, FileType type, FileSize size);
    Task<byte[]> GetFileAsync(FileSize size);
    void RemoveFile(string path);
}
