namespace ApartmentsLilly.Server.Data.Models.Reviews
{
    using System;
    using Base;
    using Bookings;

    public class Review : DeletableEntity
    {
        public Review()
        {
            this.Id = Guid.NewGuid().ToString();
        }

        public string Id { get; set; }
        public string UserId { get; set; }

        public User User { get; set; }

        public int ApartmentId { get; set; }

        public virtual Apartment Apartment { get; set; }

        public string Description { get; set; }

        public Status Status { get; set; }

        public string BookingId { get; set; }

        public virtual Booking Booking { get; set; }
    }
}
