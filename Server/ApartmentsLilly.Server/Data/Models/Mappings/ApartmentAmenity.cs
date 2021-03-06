﻿namespace ApartmentsLilly.Server.Data.Models.Mappings
{
    using System.ComponentModel.DataAnnotations;
    using Base;
    using Models.Amenities;

    public class ApartmentAmenity : Entity
    {
        public int ApartmentId { get; set; }

        [Required]
        public virtual Apartment Apartment { get; set; }

        public int AmenityId { get; set; }

        [Required]
        public virtual Amenity Amenity { get; set; }

        public AmenityImportance Importance { get; set; }
    }
}
