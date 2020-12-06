namespace ApartmentsLilly.Server.Data.Models
{
    using System;
    using Rooms;

    public class Amenity
    {
        public Amenity()
        {
            this.Id = Guid.NewGuid().ToString();
        }

        public string Id { get; set; }

        public string Name { get; set; }

        public int RoomId { get; set; }

        public Room Room { get; set; }

        public int? ApartmentId { get; set; }

        public Apartment Apartment { get; set; }
    }
}
