namespace Lytical.Artisan.Application.Commands
{
    public class CreateServiceOrderCommand
    {
        public int CustomerId { get; set; }
        public int ArtisanId { get; set; }
        public string Name { get; set; }
        public string PropertyAddress { get; set; }
        public string Issue { get; set; }
        public string Category { get; set; }
        public DateTime InspectionDate { get; set; }
        public DateTime InspectionTime { get; set; }
        public IEnumerable<string> FileNames { get; set; }
    }
}
