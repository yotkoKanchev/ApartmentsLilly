namespace ApartmentsLilly.Server.Data.Models.Mappings
{
    using System.ComponentModel.DataAnnotations;
    using Base;
    using Models.Amenities;
    using Rooms;

    public class RoomAmenity: DeletableEntity
    {
        public int RoomId { get; set; }

        [Required]
        public virtual Room Room { get; set; }

        public int AmenityId { get; set; }

        [Required]
        public virtual Amenity Amenity { get; set; }
    }
}
