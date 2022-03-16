namespace Lytical.Artisan.Domain.Entities
{
    public class Artisan : User
    {
        public virtual ArtisanService Service { get; set; }
        public IReadOnlyCollection<ServiceOrder> Orders { get; set; }
        public string Photo { get; set; }
        public string PhoneNumber { get; set; }
        public string Profession { get; set; }
        public string Address { get; set; }
        public string Location { get; set; }
        public int Rating { get; set; }
        public string FullName => GetFullName();
        public string NormalizedEmail => Email.ToUpper();
        public override string ToString() => FullName;
    }
}
