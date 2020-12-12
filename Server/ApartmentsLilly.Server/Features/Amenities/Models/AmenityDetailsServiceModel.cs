namespace ApartmentsLilly.Server.Features.Amenities.Models
{
    using Data.Models.Amenities;
    using Infrastructure.Mapping;

    public class AmenityDetailsServiceModel : IMapFrom<Amenity>
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Importance { get; set; }
    }
}
