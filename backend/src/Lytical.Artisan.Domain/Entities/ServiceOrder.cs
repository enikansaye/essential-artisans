namespace Lytical.Artisan.Domain.Entities
{
    public class ServiceOrder : IEntity
    {
        public IEnumerable<string> Media { get; set; }
        public string Name { get; set; }
        public string PropertyAddress { get; set; }
        public string Issue { get; set; }
        public DateTime InspectionDate { get; set; }
        public DateTime InspectionTime { get; set; }
        public virtual ServiceCategory Category { get; set; }
        public virtual Payment Payment { get; set; }
        public virtual Customer Customer { get; set; }
        public virtual Artificer Artisan { get; set; }
        public virtual IReadOnlyCollection<ArtisanService> Services { get; set; }
        public override string ToString() => Name;
        public virtual int Id { get; set; }
        public virtual Guid UniqueId { get; set; }
    }
}
