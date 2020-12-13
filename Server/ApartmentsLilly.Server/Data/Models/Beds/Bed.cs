namespace ApartmentsLilly.Server.Data.Models.Beds
{
    using System.ComponentModel.DataAnnotations;
    using Base;
    using Rooms;

    public class Bed: Entity
    {
        public int Id { get; set; }

        public BedType BedType { get; set; }

        public int RoomId { get; set; }
        
        [Required]
        public virtual Room Room { get; set; }
    }
}
