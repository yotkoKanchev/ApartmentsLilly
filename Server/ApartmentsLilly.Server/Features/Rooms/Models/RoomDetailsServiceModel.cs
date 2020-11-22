namespace ApartmentsLilly.Server.Features.Rooms.Models
{
    using Data.Models.Rooms;
    using Infrastructure.Mapping;

    public class RoomDetailsServiceModel : IMapFrom<Room>
    {
        public string Id { get; set; }

        public bool IsSleepable { get; set; }

        public RoomType RoomType { get; set; }

        public int ApartmentId { get; set; }
    }
}
