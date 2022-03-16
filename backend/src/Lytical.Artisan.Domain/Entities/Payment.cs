namespace Lytical.Artisan.Domain.Entities
{
    public abstract class Payment : IEntity
    {
        public int PaymentId { get; set; }
        public PaymentType PaymentType { get; protected set; }
        public PaymentStatus PaymentStatus { get; protected set; }
        public string Comment { get; protected set; }
        public Guid Id { get; }
    }
}
