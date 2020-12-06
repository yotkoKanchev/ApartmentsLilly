namespace ApartmentsLilly.Server.Features.Rooms.Models
{
    using Data.Models.Rooms;

    public class UpdateRoomRequestModel
    {
        public string Name { get; set; }

        public RoomType RoomType { get; set; }
    }
}
