namespace Lytical.Artisan.Domain.Entities
{
    public class Artificer : User
    {
        public static new Artificer Create(string email, string passwordHash, string passwordSalt)
        {
            return new Artificer
            {
                Email = email,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                AccountType = AccountType.ARTISAN

            };
        }
        public virtual ArtisanService Service { get; set; }
        public string Photo { get; set; }
        public string Profession { get; set; }
        public string Address { get; set; }
        public string Location { get; set; }
        public int Rating { get; set; }
    }
}
