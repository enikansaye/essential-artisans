namespace Lytical.Artisan.Infrastructure
{
    public class FakeDatabase
    {
        static FakeDatabase()
        {
            Users = new List<User>();
        }
        public static List<User> Users { get; set; }
    }
}
