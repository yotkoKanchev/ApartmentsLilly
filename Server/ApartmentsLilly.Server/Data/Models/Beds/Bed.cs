namespace ApartmentsLilly.Server.Data.Models.Beds
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using Rooms;

    public class Bed
    {
        public Bed()
        {
            this.Id = Guid.NewGuid().ToString();
        }

        public string Id { get; set; }

        public BedType BedType { get; set; }

        public int RoomId { get; set; }
        
        [Required]
        public virtual Room Room { get; set; }
    }
}
