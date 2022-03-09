using Lytical.Artisan.Domain.Enums;

namespace Lytical.Artisan.Domain.Entities
{
    public class User : IEntity
    {
        public int UserId { get; set; }
        public string FullName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string NormalizedEmail { get; set; }
        public bool EmailConfirmed { get; set; }
        public string PhoneNumber { get; set; }
        public bool PhoneNumberConfirmed { get; set; }
        public string PasswordHash { get; set; }
        public UserType UserType { get; set; }
        public DateTime? PasswordStamp { get; set; }
        public int AccessFailedCount { get; set; }
        public Guid Id { get; }
    }
}
