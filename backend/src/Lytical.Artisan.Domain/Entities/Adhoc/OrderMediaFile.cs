namespace Lytical.Artisan.Domain.Entities
{
    public class OrderMediaFile : MediaFile
    {
        public virtual ServiceOrder Order { get; set; }
    }
}
