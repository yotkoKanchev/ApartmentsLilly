namespace ApartmentsLilly.Server.Features.Rooms.Models
{
    using System.ComponentModel.DataAnnotations;

    public class CreateRoomRequestModel
    {
        public string Name { get; set; }

        public int RoomType { get; set; }

        public bool isSleepable { get; set; }

        [Required]
        public int ApartmentId { get; set; }
    }
}
