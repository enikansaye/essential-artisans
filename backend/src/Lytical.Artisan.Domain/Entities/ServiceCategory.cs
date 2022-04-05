namespace Lytical.Artisan.Domain.Entities
{
    public class ServiceCategory : IEntity
    {
        protected ServiceCategory()
        {

        }
        public static ServiceCategory Create(string name)
        {
            return new ServiceCategory
            {
                Name = name
            };
        }
        public void Add(Artificer artificer)
        {

        }
        public override string ToString() => Name;
        public string Name { get; set; }
        public virtual IReadOnlyCollection<Artificer> Artisans { get; set; }
        public virtual int Id { get; set; }
        public virtual Guid UniqueId { get; set; }
    }
}
