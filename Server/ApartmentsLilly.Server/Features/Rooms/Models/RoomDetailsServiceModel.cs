namespace ApartmentsLilly.Server.Features.Rooms.Models
{
    using System.Globalization;
    using AutoMapper;
    using Data.Models.Rooms;
    using Infrastructure.Mapping;

    using static Infrastructure.Extensions.EnumExtensions;

    public class RoomDetailsServiceModel : IMapFrom<Room>, IHaveCustomMappings
    {
        public int Id { get; set; }

        public int ApartmentId { get; set; }

        public string Name { get; set; }

        public EnumValue RoomType { get; set; }

        public bool IsSleepable { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<Room, RoomDetailsServiceModel>()
                .ForMember(a => a.Name, opt => opt.MapFrom(a => CultureInfo.CurrentCulture.TextInfo.ToTitleCase(a.Name)))
                .ForMember(a => a.RoomType, opt => opt.MapFrom(a => new EnumValue { Name = a.RoomType.ToString(), Value = (int)a.RoomType }));
        }
    }
}
