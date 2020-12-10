﻿namespace ApartmentsLilly.Server.Data.Models.Requests
{
    using System;
    using Base;

    public class Request : DeletableEntity
    {
        public int Id { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public int AdultsCount { get; set; }

        public int? InfantsCount { get; set; }

        public int? ChildrenCount { get; set; }

        public Status Status { get; set; }

        public string UserId { get; set; }

        public virtual User User { get; set; }
    }
}
