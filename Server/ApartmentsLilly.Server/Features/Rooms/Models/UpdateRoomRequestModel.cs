namespace ApartmentsLilly.Server.Features.Rooms.Models
{
    public class UpdateRoomRequestModel
    {
        public string Name { get; set; }

        public string RoomType { get; set; }

        public bool IsSleepable { get; set; }
    }
}
