namespace ApartmentsLilly.Server.Features.Rooms.Models
{
    using System.ComponentModel.DataAnnotations;
    using Data.Models.Rooms;

    public class CreateRoomRequestModel
    {
        public RoomType RoomType { get; set; }

        [Required]
        public int ApartmentId { get; set; }
    }
}
