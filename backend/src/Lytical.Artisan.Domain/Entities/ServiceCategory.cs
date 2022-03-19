namespace Lytical.Artisan.Domain.Entities
{
    public class ServiceCategory : IEntity
    {

        public string Name { get; set; }
        public void AddService(ArtisanService service)
        {

        }
        public void RemoveService(ArtisanService service)
        {

        }
        public void AddService(IEnumerable<ArtisanService> services)
        {

        }
        public void RemoveService(IEnumerable<ArtisanService> services)
        {

        }
        public virtual IReadOnlyCollection<ArtisanService> Services { get; set; }
        public override string ToString() => Name;
        public virtual int Id { get; set; }
        public virtual Guid UniqueId { get; set; }
    }
}
