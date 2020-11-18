namespace ApartmentsLilly.Server.Data.Models.Bookings
{
    using System;
    using System.Collections.Generic;
    using Base;
    using Reviews;

    public class Booking : DeletableEntity
    {
        public Booking()
        {
            this.Id = Guid.NewGuid().ToString();
        }
        public string Id { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public int AdultsCount { get; set; }

        public int? InfantsCount { get; set; }

        public int? ChildrenCount { get; set; }

        public Status Status { get; set; }

        public string UserId { get; set; }

        public virtual User User { get; set; }

        public int ApartmentId { get; set; }

        public virtual Apartment Apartment { get; set; }

        public virtual ICollection<Review> Reviews { get; set; } = new HashSet<Review>();
    }
}
