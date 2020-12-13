namespace ApartmentsLilly.Server.Features.Rooms.Models
{
    using Data.Models.Rooms;
    using Infrastructure.Mapping;

    public class RoomDetailsServiceModel : IMapFrom<Room>
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string RoomType { get; set; }

        public bool IsSleepable { get; set; }
    }
}
