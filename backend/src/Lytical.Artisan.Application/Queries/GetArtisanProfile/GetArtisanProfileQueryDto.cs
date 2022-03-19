﻿namespace Lytical.Artisan.Application.Queries
{
    public class GetArtisanProfileQueryDto : GetCustomerProfileQueryDto
    {
        public string ProfileImageUrl { get; set; }
        public string Profession { get; set; }
        public string Address { get; set; }
        public string Location { get; set; }
        public int Rating { get; set; }
    }
}
