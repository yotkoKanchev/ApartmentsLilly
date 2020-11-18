namespace ApartmentsLilly.Server.Data.Models.Rooms
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using Base;
    using Beds;

    public class Room : DeletableEntity
    {
        public Room()
        {
            this.Id = Guid.NewGuid().ToString();
        }

        // TODO add validations
        public string Id { get; set; }

        [MaxLength(2000)]
        [Required]
        public string Name { get; set; }

        public bool IsSleepable { get; set; }

        public int ApartmentId { get; set; }

        public virtual Apartment Apartment { get; set; }

        public virtual RoomType RoomType { get; set; }

        public virtual ICollection<Amenity> Amenities { get; set; } = new HashSet<Amenity>();

        public virtual ICollection<Bed> Beds { get; set; } = new HashSet<Bed>();

        public virtual ICollection<Image> Images { get; set; } = new HashSet<Image>();
    }
}
