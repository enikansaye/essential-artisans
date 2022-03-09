using Lytical.Artisan.Domain.Enums;
using Lytical.Artisan.Domain.Extensions;

namespace Lytical.Artisan.Domain.Entities
{
    public class User : IEntity
    {
        protected User() { }
        public static User Create(string email, string passwordHash, string passwordSalt)
        {
            return new User
            {
                Email = email,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt
            };
        }
        public void SetPasswordHash(string passwordHash) => PasswordHash = passwordHash;
        public void SetPasswordSalt(string passwordSalt) => PasswordSalt = passwordSalt;
        public void SetEmail(string email) => Email = email;
        public void SetEmailConfirmation(bool emailConfirmed) => EmailConfirmed = emailConfirmed;
        public void SetPhoneConfirmation(bool phoneConfirmed) => PhoneNumberConfirmed = phoneConfirmed;
        public int UserId { get; set; }
        public string FullName => $"{FirstName} {LastName}".ToTitleCase();
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; protected set; }
        public string NormalizedEmail => Email.ToUpper();
        public bool EmailConfirmed { get; protected set; }
        public string PhoneNumber { get; set; }
        public bool PhoneNumberConfirmed { get; protected set; }
        public string PasswordHash { get; protected set; }
        public string PasswordSalt { get; protected set; }
        public UserType UserType { get; set; }
        public DateTime? PasswordStamp { get; set; }
        public int AccessFailedCount { get; set; }
        public Guid Id { get; }
    }
}
