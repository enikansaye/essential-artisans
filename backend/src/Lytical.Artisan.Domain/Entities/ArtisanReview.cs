namespace Lytical.Artisan.Domain.Entities
{
    public class ArtisanReview
    {
        public int Rating { get; set; }
        public string Comment { get; set; }
        public virtual Customer Customer { get; set; }
    }
}
