namespace ApartmentsLilly.Server.Data.Models
{
    using System;
    using System.Collections.Generic;
    
    using Base;
    using Bookings;
    using Requests;
    using Reviews;
    using Microsoft.AspNetCore.Identity;

    public class User : IdentityUser, IEntity
    {
        public DateTime CreatedOn { get; set; }

        public string CreatedBy { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public string ModifiedBy { get; set; }

        public virtual IEnumerable<Review> Reviews { get; } = new HashSet<Review>();

        public virtual IEnumerable<Request> Requests { get; } = new HashSet<Request>();

        public virtual IEnumerable<Booking> Bookings { get; } = new HashSet<Booking>();

        public virtual Profile Profile { get; set; }
    }
}
