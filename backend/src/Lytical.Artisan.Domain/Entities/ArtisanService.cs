namespace Lytical.Artisan.Domain.Entities
{
    public class ArtisanService : IEntity
    {
        public string Name { get; set; }
        public ServiceStatus ServiceStatus { get; set; }
        public virtual ServiceCategory Category { get; set; }
        public decimal BasePrice { get; protected set; }
        public decimal FinalPrice => BasePrice - (Discount / 100 * BasePrice);
        public int Discount { get; protected set; }
        public int Quantity { get; protected set; }
        public virtual IReadOnlyCollection<Artificer> Artisans { get; set; }
        public override string ToString() => Name;
        public virtual int Id { get; set; }
        public virtual Guid UniqueId { get; set; }
    }
}
