namespace ApartmentsLilly.Server.Features.Apartments.Models
{
    using System.Globalization;
    using System.Linq;
    using Data.Models;
    using Data.Models.Rooms;
    using Infrastructure.Mapping;
    using AutoMapper;

    public class ApartmentListingServiceModel : IMapFrom<Apartment>, IHaveCustomMappings
    {
        public int Id { get; set; }

        public bool IsCompleated { get; set; }

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

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<Apartment, ApartmentListingServiceModel>()
                .ForMember(a => a.Name, opt => opt.MapFrom(a => CultureInfo.CurrentCulture.TextInfo.ToTitleCase(a.Name)))
                .ForMember(a => a.BedroomCount, opt => opt.MapFrom(a => a.Rooms.Where(r => r.RoomType == RoomType.Bedroom).Count()))
                .ForMember(a => a.BathroomCount, opt => opt.MapFrom(a => a.Rooms.Where(r => r.RoomType == RoomType.Bathroom).Count()))
                .ForMember(a => a.BedCount, opt => opt.MapFrom(a => a.Rooms.SelectMany(r => r.Beds).Count()))
                .ForMember(a => a.IsCompleated, opt => opt.MapFrom(a => a.Rooms.Any()));
        }
    }
}
