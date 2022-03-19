namespace Lytical.Artisan.Domain.Entities
{
    public abstract class Payment : IEntity
    {
        public virtual int Id { get; set; }
        public virtual Guid UniqueId { get; set; }
        public PaymentType PaymentType { get; protected set; }
        public PaymentStatus PaymentStatus { get; protected set; }
        public string Comment { get; protected set; }
        public DateTime? Date { get; set; }
    }
}
