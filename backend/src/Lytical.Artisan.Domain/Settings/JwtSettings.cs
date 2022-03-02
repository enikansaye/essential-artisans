namespace Lytical.Artisan.Domain.Settings
{
    public class JwtSettings
    {
        public string SecretKey { get; set; }
        public string RefreshKey { get; set; }
        public string EncryptingKey { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public int Expiration { get; set; }
        public int RefreshExpiration { get; set; }
    }
}
