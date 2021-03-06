﻿namespace ApartmentsLilly.Server.Data.Models.Reservations
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using ApartmentsLilly.Server.Data.Models.Reviews;
    using Base;

    public class Reservation : DeletableEntity
    {
        public int Id { get; set; }

        // TODO add validations
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public string AdditionalInfo { get; set; }

        public string Confirmation { get; set; }

        public DateTime From { get; set; }

        public DateTime To { get; set; }

        public int Adults { get; set; }

        public int Infants { get; set; }

        public int Children { get; set; }

        public ReservationStatus Status { get; set; }

        public string UserId { get; set; }

        [Required]
        public virtual User User { get; set; }

        public int ApartmentId { get; set; }

        [Required]
        public Apartment Apartment { get; set; }

        public Review Review { get; set; }
    }
}
