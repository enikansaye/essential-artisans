namespace Lytical.Artisan.Domain.Entities
{
    public class Customer : User
    {
        public void AddService(ServiceOrder service)
        {

        }
        public void RemoveService(ServiceOrder service)
        {

        }
        public void AddService(IEnumerable<ServiceOrder> services)
        {

        }
        public void RemoveService(IEnumerable<ServiceOrder> services)
        {

        }
        public IReadOnlyCollection<ServiceOrder> Orders { get; set; }
        public string PhoneNumber { get; set; }
        public string FullName => GetFullName();
        public string NormalizedEmail => Email.ToUpper();
        public override string ToString() => FullName;
    }
}
