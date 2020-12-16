namespace ApartmentsLilly.Server.Features.Amenities.Models
{
    using System.Globalization;
    using Data.Models.Mappings;
    using Infrastructure.Mapping;
    using AutoMapper;

    using static Infrastructure.Extensions.EnumExtensions;

    public class AmenityDetailsServiceModel : IMapFrom<ApartmentAmenity>, IHaveCustomMappings
    {
        public int Id { get; set; }

        public int ApartmentId { get; set; }

        public string Name { get; set; }

        public EnumValue Importance { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<ApartmentAmenity, AmenityDetailsServiceModel>()
                .ForMember(a => a.Id, opt => opt.MapFrom(a => a.AmenityId))
                .ForMember(a => a.Name, opt => opt.MapFrom(a => CultureInfo.CurrentCulture.TextInfo.ToTitleCase(a.Amenity.Name)))
                .ForMember(a => a.Importance, opt => opt.MapFrom(a => new EnumValue
                {
                    Name = a.Importance.ToString(),
                    Value = (int)a.Importance
                }));
        }
    }
}
