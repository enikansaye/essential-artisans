namespace Lytical.Artisan.Domain.Entities
{
    public class Artificer : User
    {
        public int GetArtisanRating()
        {
            return 0;
        }
        public byte[] ProfileImage { get; set; }
        public string Profession { get; set; }
        public string Address { get; set; }
        public string Location { get; set; }
        public virtual IReadOnlyCollection<ArtisanReview> Reviews { get; set; }
        public string Bio { get; set; }
        public ArtisanStatus Status { get; set; }
        public virtual ServiceCategory Category { get; set; }
        public decimal BasePrice { get; protected set; }
        public decimal FinalPrice => BasePrice - (Discount / 100 * BasePrice);
        public int Discount { get; protected set; }
    }
}
