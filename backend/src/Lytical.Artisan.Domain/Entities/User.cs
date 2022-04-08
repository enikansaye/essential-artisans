using Lytical.Artisan.Domain.Extensions;

namespace Lytical.Artisan.Domain.Entities
{
    public class User : IEntity
    {
        protected User() { }
        public static User New(int id)
        {
            return new User
            {
                Id = id,
            };
        }
        public static User Create(string email, AccountType type, string passwordHash, string passwordSalt)
        {
            return new User
            {
                Email = email,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                AccountType = type

            };
        }
        public void SetPasswordHash(string passwordHash) => PasswordHash = passwordHash;
        public void SetPasswordSalt(string passwordSalt) => PasswordSalt = passwordSalt;
        public void SetEmail(string email) => Email = email;
        public void SetEmailConfirmation(DateTime? date) => EmailConfirmed = date;
        public void SetRefreshToken(string token, DateTime expiration)
        {
            RefreshToken = token;
            RefreshTokenExpires = expiration;
        }
        public void UpdatePassword(string passwordHash, string passwordSalt)
        {
            PasswordHash = passwordHash;
            PasswordSalt = passwordSalt;
            PasswordResetStamp = null;
            PasswordResetToken = null;
        }
        public void IncrementAccessFailedCount() => AccessFailedCount += 1;
        public void ResetAccessFailedCount() => AccessFailedCount = 0;
        public void ClearEmailConfirmation() => EmailVerificationToken = null;
        public bool HasActiveRefreshToken() => DateTime.UtcNow >= RefreshTokenExpires;
        public bool HasExpiredPasswordRestToken() => PasswordResetStamp.HasValue &&
                           (DateTime.UtcNow - Convert.ToDateTime(PasswordResetStamp)).Hours >= 24;
        public void RemoveRefreshToken() => RefreshToken = null;
        public bool ConfirmEmail() => EmailConfirmed.HasValue;
        public string GetFullName() => $"{FirstName} {LastName}".ToTitleCase();
        public override string ToString() => FullName;
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; protected set; }
        public string PhoneNumber { get; set; }
        public string FullName => GetFullName();
        public string NormalizedEmail => Email.ToUpper();
        public string PasswordHash { get; protected set; }
        public string PasswordSalt { get; protected set; }
        public string PasswordResetToken { get; set; }
        public string EmailVerificationToken { get; set; }
        public string RefreshToken { get; protected set; }
        public AccountType AccountType { get; protected set; }
        public DateTime? PasswordResetStamp { get; set; }
        public DateTime DateRigistered { get; protected set; }
        public DateTime? RefreshTokenExpires { get; protected set; }
        public DateTime? PhoneNumberConfirmed { get; protected set; }
        public DateTime? EmailConfirmed { get; protected set; }

        /// <summary>
        ///  AccessFailedCount will increase for every failed login attempt
        ///  and reset once the account is locked out or on sucessful login
        /// </summary>
        public int AccessFailedCount { get; protected set; }
        public virtual int Id { get; set; }
        public virtual Guid UniqueId { get; set; }
        public virtual IReadOnlyCollection<ServiceOrder> Orders { get; set; }
    }
}
