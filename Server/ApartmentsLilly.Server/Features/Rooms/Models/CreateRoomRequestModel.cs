namespace ApartmentsLilly.Server.Features.Rooms.Models
{
    using System.ComponentModel.DataAnnotations;
    using Data.Models.Rooms;

    public class CreateRoomRequestModel
    {
        public string Name { get; set; }

        public string RoomType { get; set; }

        [Required]
        public int ApartmentId { get; set; }
    }
}
