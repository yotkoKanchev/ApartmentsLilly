namespace ApartmentsLilly.Server.Data.Models.Mappings
{
    using System.ComponentModel.DataAnnotations;
    using Amenities;
    using Base;
    using Rooms;

    public class RoomAmenity : Entity
    {
        public int RoomId { get; set; }

        [Required]
        public virtual Room Room { get; set; }

        public int AmenityId { get; set; }

        [Required]
        public virtual Amenity Amenity { get; set; }

        public AmenityImportance Importance { get; set; }
    }
}
