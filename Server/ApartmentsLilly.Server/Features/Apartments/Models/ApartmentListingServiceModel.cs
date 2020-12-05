namespace ApartmentsLilly.Server.Features.Apartments.Models
{
    using ApartmentsLilly.Server.Data.Models.Rooms;
    using AutoMapper;
    using Data.Models;
    using Infrastructure.Mapping;
    using System.Linq;

    public class ApartmentListingServiceModel : IMapFrom<Apartment>, IHaveCustomMappings
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public double? Size { get; set; }

        public double? BasePrice { get; set; }

        public int? MaxOccupants { get; set; }

        public string MainImageUrl { get; set; }

        public string Description { get; set; }

        public string AddressId { get; set; }

        public string AddressCountry { get; set; }

        public string AddressCity { get; set; }

        public string AddressNeighborhood { get; set; }

        public string AddressStreetAddress { get; set; }

        public int BedroomCount { get; set; }

        public int BathroomCount { get; set; }

        public int BedCount { get; set; }

        public string[] Amenities { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<Apartment, ApartmentListingServiceModel>()
                .ForMember(a => a.BedroomCount, opt => opt.MapFrom(a => a.Rooms.Where(r => r.RoomType == RoomType.Bedroom).Count()))
                .ForMember(a => a.BathroomCount, opt => opt.MapFrom(a => a.Rooms.Where(r => r.RoomType == RoomType.Bathroom).Count()))
                .ForMember(a => a.BedCount, opt => opt.MapFrom(a => a.Rooms.Where(r => r.RoomType == RoomType.Bedroom).Select(r=>r.Beds).Count()))
                .ForMember(a => a.Amenities, opt => opt.MapFrom(a => a.Amenities.Select(a => a.Name).ToArray()));
        }
    }
}
