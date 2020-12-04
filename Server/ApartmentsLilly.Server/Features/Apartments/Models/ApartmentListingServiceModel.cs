namespace ApartmentsLilly.Server.Features.Apartments.Models
{
    using Data.Models;
    using Infrastructure.Mapping;

    public class ApartmentListingServiceModel : IMapFrom<Apartment>
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public double? Size { get; set; }

        public double? BasePrice { get; set; }

        public int? MaxOccupants { get; set; }

        public string MainImageUrl { get; set; }

        public string Description { get; set; }

        public string AddressId { get; set; }

        public string AddressCountry{ get; set; }

        public string AddressCity { get; set; }

        public string AddressNeighborhood { get; set; }

        public string AddressStreetAddress { get; set; }
    }
}
