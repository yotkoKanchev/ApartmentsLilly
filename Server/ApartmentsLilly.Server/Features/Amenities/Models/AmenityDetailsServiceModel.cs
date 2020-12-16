namespace ApartmentsLilly.Server.Features.Amenities.Models
{
    using System.Globalization;
    using AutoMapper;
    using Data.Models.Amenities;
    using Infrastructure.Mapping;

    public class AmenityDetailsServiceModel : IMapFrom<Amenity>, IHaveCustomMappings
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public object Importance { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<Amenity, AmenityDetailsServiceModel>()
                .ForMember(a => a.Name, opt => opt.MapFrom(a => CultureInfo.CurrentCulture.TextInfo.ToTitleCase(a.Name)));
        }
    }
}
