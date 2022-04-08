namespace Lytical.Artisan.Application.Commands
{
    public class UpdateArtisanDto : UpdateCustomerDto
    {
        public string Address { get; set; }
        public string Location { get; set; }
        public string Service { get; set; }
    }
}
