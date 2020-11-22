namespace ApartmentsLilly.Server.Features.Rooms.Models
{
    using Data.Models.Rooms;

    public class UpdateRoomRequestModel
    {
        public bool IsSleepable { get; set; }

        public RoomType RoomType { get; set; }
    }
}
