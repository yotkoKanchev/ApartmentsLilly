namespace ApartmentsLilly.Server.Data.Models
{
    using System;
    using System.Collections.Generic;

    using Base;
    using Bookings;
    using Requests;
    using Reviews;
    using Microsoft.AspNetCore.Identity;

    public class User : IdentityUser, IEntity, IDeletableEntity
    {
        public DateTime CreatedOn { get; set; }

        public string CreatedBy { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public string ModifiedBy { get; set; }

        public DateTime? DeletedOn { get; set; }

        public string DeletedBy { get; set; }

        public bool IsDeleted { get; set; }

        public virtual ICollection<Review> Reviews { get; } = new HashSet<Review>();

        public virtual ICollection<Request> Requests { get; } = new HashSet<Request>();

        public virtual ICollection<Booking> Bookings { get; } = new HashSet<Booking>();

        public virtual Profile Profile { get; set; }
    }
}
