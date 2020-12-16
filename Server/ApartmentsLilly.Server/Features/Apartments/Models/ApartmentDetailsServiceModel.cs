namespace ApartmentsLilly.Server.Features.Apartments.Models
{
    using System.Collections.Generic;
    using System.Globalization;
    using System.Linq;
    using Amenities.Models;
    using Data.Models;
    using Rooms.Models;
    using Infrastructure.Mapping;
    using AutoMapper;

    public class ApartmentDetailsServiceModel : IMapFrom<Apartment>, IHaveCustomMappings
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string Entry { get; set; }

        public int? Floor { get; set; }

        public string Number { get; set; }

        public double? Size { get; set; }

        public double? BasePrice { get; set; }

        public bool HasTerrace { get; set; }

        public int? MaxOccupants { get; set; }

        public string MainImageUrl { get; set; }

        public string AddressId { get; set; }

        public string AddressCountry { get; set; }

        public string AddressCity { get; set; }

        public string AddressNeighborhood { get; set; }

        public string AddressStreetAddress { get; set; }

        public ICollection<RoomDetailsServiceModel> Rooms { get; set; }

        public ICollection<AmenityDetailsServiceModel> Amenities { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<Apartment, ApartmentDetailsServiceModel>()
                .ForMember(a => a.Name, opt => opt.MapFrom(a => CultureInfo.CurrentCulture.TextInfo.ToTitleCase(a.Name)))
                .ForMember(a => a.Rooms, opt => opt.MapFrom(a => a.Rooms
                                                                    .OrderBy(r => r.Name)))
                .ForMember(a => a.Amenities, opt => opt.MapFrom(a => a.Amenities
                                                                        .OrderByDescending(b => b.Importance)
                                                                        .Select(b => b.Amenity)));
        }
    }
}
