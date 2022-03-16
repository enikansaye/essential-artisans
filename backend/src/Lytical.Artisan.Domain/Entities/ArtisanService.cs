namespace Lytical.Artisan.Domain.Entities
{
    public class ArtisanService : IEntity
    {
        public string Name { get; set; }
        public ServiceStatus ServiceStatus { get; set; }
        public virtual ServiceCategory Category { get; set; }
        public decimal BasePrice { get; protected set; }
        public decimal FinalPrice => BasePrice - (DiscountValue / 100 * BasePrice);
        public int Discount { get; protected set; }
        public int Quantity { get; protected set; }
        public IReadOnlyCollection<Artisan> Artisans { get; set; }
        public override string ToString() => Name;
        public Guid Id { get; }
    }
}
