namespace Lytical.Artisan.Application.Queries
{
    public class GetAllServiceOrdersQueryDto
    {
        public string Name { get; set; }
        public string PropertyAddress { get; set; }
        public string Issue { get; set; }
        public bool IsApproved { get; set; }
        public DateTime Date { get; set; }
        public DateTime InspectionDate { get; set; }
        public DateTime InspectionTime { get; set; }
        public virtual int Id { get; set; }
        public virtual Guid UniqueId { get; set; }

        public string CustomerName { get; set; }
        public string CustomerEmail { get; set; }
        public string CustomerPhoneNumber { get; set; }

        public string ArtisanName { get; set; }
        public string ArtisanEmail { get; set; }
        public string ArtisanPhoneNumber { get; set; }

        public byte[] ArtisanProfileImage { get; set; }
        public string ArtisanLocation { get; set; }
        public int ArtisanRating { get; set; }
    }
}
