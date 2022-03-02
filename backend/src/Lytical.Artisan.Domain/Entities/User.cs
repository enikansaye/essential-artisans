using Lytical.Artisan.Domain.Enums;

namespace Lytical.Artisan.Domain.Entities
{
    public class User : IEntity
    {
        public string UserId { get; set; }
        public string FullName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public UserType UserType { get; set; }
        public Guid Id { get; }
    }
}
