namespace Lytical.Artisan.Infrastructure
{
    public class FakeDatabase
    {
        static FakeDatabase()
        {
            Users = new List<User>();
            var user = User.Create("string", "TMZC/zV1CWsf7UNhZLrOccNbvIizC2XCu9m14Tfx/+4=", "OtYaN0oXssqZhdxFVUjg7w==");
            user.Id = 1;
            Users.Add(user);
            Artisans = new List<Artisan.Domain.Entities.Artificer>();
            var art = Artificer.Create("string", "TMZC/zV1CWsf7UNhZLrOccNbvIizC2XCu9m14Tfx/+4=", "OtYaN0oXssqZhdxFVUjg7w==");
            art.Id = 2;
            Artisans.Add(art);
        }
        public static List<User> Users { get; set; }
        public static List<Artisan.Domain.Entities.Artificer> Artisans { get; set; }
    }
}
