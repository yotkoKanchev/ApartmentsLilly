namespace ApartmentsLilly.Server.Data.Models.Mappings
{
    using Base;
    using System.ComponentModel.DataAnnotations;

    public class ApartmentAmenity : DeletableEntity
    {
        public int ApartmentId { get; set; }

        [Required]
        public virtual Apartment Apartment { get; set; }

        public int AmenityId { get; set; }

        [Required]
        public virtual Amenity Amenity { get; set; }
    }
}
