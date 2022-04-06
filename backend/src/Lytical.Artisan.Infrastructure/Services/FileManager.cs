using Lytical.Artisan.Domain.Exceptions;
using Microsoft.AspNetCore.Hosting;

namespace Lytical.Artisan.Infrastructure.Services;
public class FileManager : IFileManager
{
    public FileManager(IWebHostEnvironment env, IFormFile file)
    {
        _env = env;
        _file = file;
    }

    public async Task<string> AddFileAsync(string uniqueFileName, FileType type, FileSize size)
    {
        if (IsValidFileSize(size).IsFalse()) throw new ArtisanException(ErrorCode.FileSizeLimit, "The file is too large.");

        var rootPath = Path.Combine(_env.ContentRootPath, "FileSystem");
        var directoryPath = type == FileType.IMG ? Path.Combine(rootPath, "Imgs") : Path.Combine(rootPath, "Docs");
        if (Directory.Exists(directoryPath).IsFalse())
            Directory.CreateDirectory(directoryPath);

        var filePath = Path.Combine(directoryPath, uniqueFileName);
        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            if (IsValidFileExtension(stream).IsFalse())
                throw new ArtisanException(ErrorCode.UnspportedFileType, "Unsupported file type.");
            await _file.CopyToAsync(stream);
        }
        return filePath;
    }

    public void RemoveFile(string path)
    {
        File.Delete(path);

        var directoryPath = Path.GetDirectoryName(path);

        var items = Directory.EnumerateDirectories(directoryPath).ToList();
        items.AddRange(Directory.EnumerateFiles(directoryPath));
        if (items.NotAny())
        {
            Directory.Delete(directoryPath);
        }
    }

    public async Task<byte[]> GetFileAsync(FileSize size)
    {
        if (_file.Length <= 0 || string.IsNullOrEmpty(_file.FileName)) throw new ArtisanException(ErrorCode.EmptyFile);
        if (IsValidFileSize(size).IsFalse()) throw new ArtisanException(ErrorCode.FileSizeLimit, "The file is too large.");

        using (var memoryStream = new MemoryStream())
        {
            await _file.CopyToAsync(memoryStream);
            var bytes = memoryStream.ToArray();
            if (IsValidFileExtension(bytes).IsFalse())
                throw new ArtisanException(ErrorCode.UnspportedFileType, "Unsupported file type.");
            return bytes;
        }

    }
    private bool IsValidFileExtension(Stream uploadedFileData)
    {
        var ext = Path.GetExtension(_file.FileName).ToLowerInvariant();

        if (string.IsNullOrEmpty(ext) || _fileSignature.ContainsKey(ext).IsFalse())
            return false;
        using (var reader = new BinaryReader(uploadedFileData))
        {
            var signatures = _fileSignature[ext];
            var headerBytes = reader.ReadBytes(signatures.Max(m => m.Length));

            return signatures.Any(signature =>
                headerBytes.Take(signature.Length).SequenceEqual(signature));
        }
    }
    private bool IsValidFileExtension(byte[] fileData)
    {
        var ext = Path.GetExtension(_file.FileName).ToUpperInvariant();

        if (string.IsNullOrEmpty(ext) || _fileSignature.ContainsKey(ext).IsFalse())
            return false;
        var signatures = _fileSignature[ext];
        var flag = false;
        foreach (var b in signatures)
        {
            var curFileSig = new byte[b.Length];
            Array.Copy(fileData, curFileSig, b.Length);
            if (curFileSig.SequenceEqual(b))
            {
                flag = true;
                break;
            }
        }

        return flag;
    }
    private bool IsValidFileSize(FileSize size)
    {
        var fileSize = _file.Length;
        var kilobyte = new decimal(1024);
        var megabyte = new decimal(1024 * 1024);
        var gigabyte = new decimal(1024 * 1024 * 1024);
        var flag = false;
        switch (size)
        {
            case FileSize.KB:
                flag = fileSize < kilobyte;
                break;
            case FileSize.MB:
                flag = fileSize < megabyte;
                break;
            case FileSize.GB:
                flag = fileSize < gigabyte;
                break;
            case FileSize.MB2:
                flag = fileSize < 2 * megabyte;
                break;
            default:
                break;
        }
        return flag;
    }
    private readonly Dictionary<string, List<byte[]>> _fileSignature = new()
    {
        { ".DOC", new List<byte[]> { new byte[] { 0xD0, 0xCF, 0x11, 0xE0, 0xA1, 0xB1, 0x1A, 0xE1 } } },
        { ".DOCX", new List<byte[]> { new byte[] { 0x50, 0x4B, 0x03, 0x04 } } },
        { ".PDF", new List<byte[]> { new byte[] { 0x25, 0x50, 0x44, 0x46 } } },
        {
            ".ZIP",
            new List<byte[]>  { new byte[] { 0x50, 0x4B, 0x03, 0x04 },
                                    new byte[] { 0x50, 0x4B, 0x4C, 0x49, 0x54, 0x55 },
                                    new byte[] { 0x50, 0x4B, 0x53, 0x70, 0x58 },
                                    new byte[] { 0x50, 0x4B, 0x05, 0x06 },
                                    new byte[] { 0x50, 0x4B, 0x07, 0x08 },
                                    new byte[] { 0x57, 0x69, 0x6E, 0x5A, 0x69, 0x70 }
                                    }
        },
        { ".PNG", new List<byte[]> { new byte[] { 0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A } } },
        {
            ".JPG",
            new List<byte[]>
                            {
                                new byte[] { 0xFF, 0xD8, 0xFF, 0xE0 },
                                new byte[] { 0xFF, 0xD8, 0xFF, 0xE1 },
                                new byte[] { 0xFF, 0xD8, 0xFF, 0xE8 }
                            }
        },
        {
            ".JPEG",
            new List<byte[]>
                            {
                                new byte[] { 0xFF, 0xD8, 0xFF, 0xE0 },
                                new byte[] { 0xFF, 0xD8, 0xFF, 0xE2 },
                                new byte[] { 0xFF, 0xD8, 0xFF, 0xE3 }
                            }
        },
        {
            ".XLS",
            new List<byte[]>
                            {
                                new byte[] { 0xD0, 0xCF, 0x11, 0xE0, 0xA1, 0xB1, 0x1A, 0xE1 },
                                new byte[] { 0x09, 0x08, 0x10, 0x00, 0x00, 0x06, 0x05, 0x00 },
                                new byte[] { 0xFD, 0xFF, 0xFF, 0xFF }
                            }
        },
        { ".XLSX", new List<byte[]> { new byte[] { 0x50, 0x4B, 0x03, 0x04 } } },
        { ".GIF", new List<byte[]> { new byte[] { 0x47, 0x49, 0x46, 0x38 } } }
    };
    private readonly IWebHostEnvironment _env;
    private readonly IFormFile _file;
}
