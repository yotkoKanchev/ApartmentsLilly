﻿namespace ApartmentsLilly.Server.Data.Models.Rooms
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using Base;
    using Beds;

    public class Room : DeletableEntity
    {
        // TODO add validations
        public int Id { get; set; }

        public string Name { get; set; }

        public RoomType RoomType { get; set; }

        [Required]
        public int ApartmentId { get; set; }

        public virtual Apartment Apartment { get; set; }

        public virtual ICollection<Amenity> Amenities { get; set; } = new HashSet<Amenity>();

        public virtual ICollection<Bed> Beds { get; set; } = new HashSet<Bed>();

        public virtual ICollection<Image> Images { get; set; } = new HashSet<Image>();
    }
}