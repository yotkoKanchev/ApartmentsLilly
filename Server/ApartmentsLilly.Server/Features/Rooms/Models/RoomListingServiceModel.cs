namespace ApartmentsLilly.Server.Features.Rooms.Models
{
    using System.Globalization;
    using AutoMapper;
    using Data.Models.Rooms;
    using Infrastructure.Mapping;

    public class RoomListingServiceModel : IMapFrom<Room>, IHaveCustomMappings
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public bool IsSleepable { get; set; }

        public RoomType RoomType { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<Room, RoomListingServiceModel>()
                .ForMember(a => a.Name, opt => opt.MapFrom(a => CultureInfo.CurrentCulture.TextInfo.ToTitleCase(a.Name)));
        }
    }
}
