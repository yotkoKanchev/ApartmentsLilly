namespace ApartmentsLilly.Server.Features.Amenities.Models
{
    using System.Globalization;
    using Data.Models.Mappings;
    using Infrastructure.Mapping;
    using AutoMapper;

    using static Infrastructure.Extensions.EnumExtensions;

    public class RoomAmenityDetailsServiceModel : IMapFrom<RoomAmenity>, IHaveCustomMappings
    {
        public int RoomId { get; set; }

        public int AmenityId { get; set; }

        public string Name { get; set; }

        public EnumValue Importance { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<RoomAmenity, RoomAmenityDetailsServiceModel>()
                .ForMember(a => a.Name, opt => opt.MapFrom(a => CultureInfo.CurrentCulture.TextInfo.ToTitleCase(a.Amenity.Name)))
                .ForMember(a => a.Importance, opt => opt.MapFrom(a => new EnumValue
                {
                    Name = a.Importance.ToString(),
                    Value = (int)a.Importance
                }));
        }
    }
}
