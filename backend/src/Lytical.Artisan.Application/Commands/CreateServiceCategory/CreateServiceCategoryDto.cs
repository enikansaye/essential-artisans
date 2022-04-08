namespace Lytical.Artisan.Application.Commands
{
    public class CreateServiceCategoryDto
    {
        public CreateServiceCategoryDto(string name)
        {
            Name = name;
        }
        public string Name { get; set; }
    }
}
