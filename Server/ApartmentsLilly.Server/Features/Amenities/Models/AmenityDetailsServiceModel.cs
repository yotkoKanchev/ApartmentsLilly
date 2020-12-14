namespace ApartmentsLilly.Server.Features.Amenities.Models
{
    using AutoMapper;
    using Data.Models.Amenities;
    using Infrastructure.Mapping;
    using System.Linq;

    public class AmenityDetailsServiceModel : IMapFrom<Amenity>/*, IHaveCustomMappings*/
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public object Importance { get; set; }

        //public void CreateMappings(IProfileExpression configuration)
        //{
        //    configuration.CreateMap<Amenity, AmenityDetailsServiceModel>()
        //        .ForMember(a => a.Importance, opt => opt.MapFrom(a => a.Apartments.Select(b=>b.Importance)));
        //}
    }
}
