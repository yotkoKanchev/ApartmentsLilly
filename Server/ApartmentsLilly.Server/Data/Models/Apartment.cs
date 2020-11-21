namespace ApartmentsLilly.Server.Data.Models
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using Base;
    using Bookings;
    using Reviews;
    using Rooms;

    using static Validation.Apartment;

    public class Apartment : DeletableEntity    
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(MaxNameLength)]
        [MinLength(MinNameLength)]
        public string Name { get; set; }

        [Required]
        [MaxLength(MaxDescriptionLength)]
        public string Description { get; set; }

        public string Entry { get; set; }

        public int Floor { get; set; }

        public string Number { get; set; }

        public double Size { get; set; }

        public double BasePrice { get; set; }

        public bool HasTerrace { get; set; }

        public int MaxOccupants { get; set; }

        public string MainImageUrl { get; set; }
        // TODO ad real images upload
        //public virtual Image MainImage { get; set; }

        public string AddressId { get; set; }

        public virtual Address Address { get; set; }

        public virtual ICollection<Image> CommonImages { get; set; } = new HashSet<Image>();

        public virtual ICollection<Room> Rooms { get; set; } = new HashSet<Room>();

        public virtual ICollection<Amenity> Amenities { get; set; } = new HashSet<Amenity>();

        public virtual ICollection<Review> Reviews { get; set; } = new HashSet<Review>();

        public virtual ICollection<Booking> Bookings { get; set; } = new HashSet<Booking>();
    }
}
