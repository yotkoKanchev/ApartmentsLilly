namespace ApartmentsLilly.Server.Features.Beds.Models
{
    using AutoMapper;
    using Data.Models.Beds;
    using Infrastructure.Mapping;

    using static Infrastructure.Extensions.EnumExtensions;

    public class BedDetailsServiceModel : IMapFrom<Bed>, IHaveCustomMappings
    {
        public int Id { get; set; }

        public EnumValue BedType { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<Bed, BedDetailsServiceModel>()
                .ForMember(a => a.BedType, opt => opt.MapFrom(a => new EnumValue { Name = a.BedType.ToString(), Value = (int)a.BedType }));
        }
    }
}
