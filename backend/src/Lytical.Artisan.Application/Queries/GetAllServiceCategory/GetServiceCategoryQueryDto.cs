namespace Lytical.Artisan.Application.Queries
{
    public class GetServiceCategoryQueryDto
    {
        public GetServiceCategoryQueryDto(string name)
        {
            Name = name;
        }
        public string Name { get; set; }
    }
}
