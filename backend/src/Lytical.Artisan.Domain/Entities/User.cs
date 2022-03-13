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
                PasswordSalt = passwordSalt,

            };
        }
        public void SetPasswordHash(string passwordHash) => PasswordHash = passwordHash;
        public void SetPasswordSalt(string passwordSalt) => PasswordSalt = passwordSalt;
        public void SetEmail(string email) => Email = email;
        public void SetEmailConfirmation(DateTime? date) => EmailConfirmed = date;
        public void SetPhoneConfirmation(bool phoneConfirmed) => PhoneNumberConfirmed = phoneConfirmed;
        public void IncrementAccessFailedCount() => AccessFailedCount += 1;
        public void ResetAccessFailedCount() => AccessFailedCount = 0;
        public void ClearEmailConfirmation() => VerificationToken = null;
        public string FullName => $"{FirstName} {LastName}".ToTitleCase();
        public string NormalizedEmail => Email.ToUpper();
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; protected set; }
        public bool IsEmailConfirmed => EmailConfirmed != null;
        public DateTime? EmailConfirmed { get; protected set; }
        public string PhoneNumber { get; set; }
        public bool PhoneNumberConfirmed { get; protected set; }
        public string PasswordHash { get; protected set; }
        public string PasswordSalt { get; protected set; }
        public string PasswordResetToken { get; set; }
        public DateTime? PasswordResetStamp { get; set; }
        public string VerificationToken { get; set; }
        public DateTime DateRigistered { get; protected set; }
        public UserType UserType { get; set; }
        /// <summary>
        ///  AccessFailedCount will increase for every failed login attempt
        ///  and reset once the account is locked out or on sucessful login
        /// </summary>
        public int AccessFailedCount { get; protected set; }
        public Guid Id { get; }
    }
}
