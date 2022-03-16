namespace Lytical.Artisan.Domain.Entities
{
    public class ServiceOrder : IEntity
    {
        public IEnumerable<string> Media { get; set; }
        public string Name { get; set; }
        public string PropertyAddress { get; set; }
        public string Issue { get; set; }
        public DateOnly InspectionDate { get; set; }
        public TimeOnly InspectionTime { get; set; }
        public virtual ServiceCategory Category { get; set; }
        public virtual Payment Payment { get; set; }
        public virtual Customer Customer { get; set; }
        public virtual Artisan Artisan { get; set; }
        public IReadOnlyCollection<ArtisanService> Services { get; set; }
        public override string ToString() => Name;
        public Guid Id { get; }
    }
}
