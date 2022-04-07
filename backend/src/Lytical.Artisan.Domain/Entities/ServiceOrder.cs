namespace Lytical.Artisan.Domain.Entities
{
    public class ServiceOrder : IEntity
    {
        protected ServiceOrder() { }
        public static ServiceOrder Create(string name, string address, string issue)
        {
            return new ServiceOrder
            {
                Name = name,
                PropertyAddress = address,
                Issue = issue,
                Date = DateTime.UtcNow
            };
        }
        public ServiceOrder SetDateTime(DateTime inspectionDate, DateTime inspectionTime)
        {
            InspectionDate = inspectionDate;
            InspectionTime = inspectionTime;
            return this;
        }
        public void AddFile(OrderMediaFile file)
        {
        }
        public override string ToString() => Name;
        public string Name { get; set; }
        public string PropertyAddress { get; set; }
        public string Issue { get; set; }
        public bool IsApproved { get; set; }
        public DateTime Date { get; protected set; }
        public DateTime InspectionDate { get; set; }
        public DateTime InspectionTime { get; set; }
        public virtual Payment Payment { get; set; }
        public virtual User Customer { get; set; }
        public virtual Artificer Artisan { get; set; }
        public virtual int Id { get; set; }
        public virtual Guid UniqueId { get; set; }
        public virtual IReadOnlyCollection<OrderMediaFile> Files { get; set; }
    }
}
