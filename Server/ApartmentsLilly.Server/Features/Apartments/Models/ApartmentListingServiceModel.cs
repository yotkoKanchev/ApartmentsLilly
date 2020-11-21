namespace ApartmentsLilly.Server.Features.Apartments.Models
{
    using AutoMapper;
    using Data.Models;
    using Mapping;

    public class ApartmentListingServiceModel : IMapFrom<Apartment>
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public double? Size { get; set; }

        public double? BasePrice { get; set; }

        public int? MaxOccupants { get; set; }

        public string MainImageUrl { get; set; }

        public string AddressId { get; set; }

        public string AddressNeighborhood { get; set; }

        public string AddressStreetAddress { get; set; }

        //public void CreateMappings(IProfileExpression configuration)
        //{
        //    configuration.CreateMap<Apartment, ApartmentListingServiceModel>()
        //        .ForMember(a => a.AddressNeighborhood, opt => opt.MapFrom(a => a.Address.Neighborhood))
        //        .ForMember(a => a.AddressStreetAddress, opt => opt.MapFrom(a => a.Address.StreetAddress));
        //}
    }
}
