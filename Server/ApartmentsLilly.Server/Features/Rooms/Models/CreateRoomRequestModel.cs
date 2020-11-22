namespace ApartmentsLilly.Server.Features.Rooms.Models
{
    using System.ComponentModel.DataAnnotations;
    using Data.Models.Rooms;

    public class CreateRoomRequestModel
    {
        [MaxLength(200)]
        [Required]
        public string Name { get; set; }

        public virtual RoomType RoomType { get; set; }

        [Required]
        public int ApartmentId { get; set; }
    }
}
