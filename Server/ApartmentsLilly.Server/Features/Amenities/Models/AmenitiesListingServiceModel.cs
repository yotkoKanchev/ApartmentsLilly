namespace ApartmentsLilly.Server.Features.Amenities.Models
{
    using Data.Models.Amenities;
    using Infrastructure.Mapping;

    public class AmenitiesListingServiceModel : IMapFrom<Amenity>
    {
        public int Id { get; set; }

        public string Name { get; set; }
    }
}
