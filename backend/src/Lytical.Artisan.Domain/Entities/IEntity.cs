namespace Lytical.Artisan.Domain.Entities
{
    public interface IEntity
    {
        int Id { get; set; }
        Guid UniqueId { get; set; }
    }
}
