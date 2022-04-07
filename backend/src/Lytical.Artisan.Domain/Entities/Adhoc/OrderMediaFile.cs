namespace Lytical.Artisan.Domain.Entities
{
    public class OrderMediaFile : MediaFile
    {
        public OrderMediaFile(ServiceOrder order) => Order = order;
        public virtual ServiceOrder Order { get; protected set; }
    }
}
