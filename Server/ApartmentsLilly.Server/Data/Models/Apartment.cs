﻿namespace ApartmentsLilly.Server.Data.Models
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
        // TODO ADD all validations

        [MaxLength(EntryMaxLength)]
        public string Entry { get; set; }

        [Range(MinFloor, MaxFloor)]
        public int? Floor { get; set; }

        [MinLength(NumberMinLength)]
        [MaxLength(NumberMaxLength)]
        public string Number { get; set; }

        [Range(ZeroValue, MaxSize)]
        public double? Size { get; set; }

        [Range(ZeroValue, MaxBasePrice)]
        public double? BasePrice { get; set; }

        public bool HasTerrace { get; set; }

        [Range(ZeroValue, MaximumOccupants)]
        public int? MaxOccupants { get; set; }

        [RegularExpression(UrlPattern)]
        public string MainImageUrl { get; set; }
        // TODO ad real images upload
        //public virtual Image MainImage { get; set; }

        [Required]
        public string AddressId { get; set; }

        public virtual Address Address { get; set; }

        public virtual ICollection<Image> CommonImages { get; set; } = new HashSet<Image>();

        public virtual ICollection<Room> Rooms { get; set; } = new HashSet<Room>();

        public virtual ICollection<Amenity> Amenities { get; set; } = new HashSet<Amenity>();

        public virtual ICollection<Review> Reviews { get; set; } = new HashSet<Review>();

        public virtual ICollection<Booking> Bookings { get; set; } = new HashSet<Booking>();
    }
}