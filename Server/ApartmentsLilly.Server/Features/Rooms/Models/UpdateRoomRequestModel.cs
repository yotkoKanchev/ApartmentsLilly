namespace ApartmentsLilly.Server.Features.Rooms.Models
{
    public class UpdateRoomRequestModel
    {
        public string Name { get; set; }

        public int? RoomType { get; set; }

        public bool IsSleepable { get; set; }
    }
}
