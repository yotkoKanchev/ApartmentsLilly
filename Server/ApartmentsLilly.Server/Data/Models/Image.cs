namespace ApartmentsLilly.Server.Data.Models
{
    using System;
    using Base;
    using Rooms;

    public class Image : DeletableEntity
    {
        public Image()
        {
            this.Id = Guid.NewGuid().ToString();
        }

        public string Id { get; set; }

        public string Url { get; set; }

        public int? ApartmentId { get; set; }

        public virtual Apartment Apartment { get; set; }

        public int RoomId { get; set; }

        public virtual Room Room { get; set; }

        public virtual User User { get; set; }
    }
}
