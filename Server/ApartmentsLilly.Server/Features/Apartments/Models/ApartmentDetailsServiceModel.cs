namespace ApartmentsLilly.Server.Features.Apartments.Models
{
    using Data.Models;
    using Rooms.Models;
    using Infrastructure.Mapping;
    using System.Collections.Generic;
    using AutoMapper;
    using ApartmentsLilly.Server.Data.Models.Rooms;
    using System.Linq;

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

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<Apartment, ApartmentDetailsServiceModel>()
                .ForMember(a => a.Rooms, opt => opt.MapFrom(a => a.Rooms.OrderBy(r=>r.Name)));
        }
    }
}
