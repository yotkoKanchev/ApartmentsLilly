namespace ApartmentsLilly.Server.Features.Reservations.Models
{
    using ApartmentsLilly.Server.Data.Models.Reservations;
    using System;
    using System.ComponentModel.DataAnnotations;

    public class EditReservationRequestModel
    {
        public int Id { get; set; }

        public string Confirmation { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [EmailAddress]
        [Required]
        public string Email { get; set; }

        [Required]
        public string PhoneNumber { get; set; }

        public string AdditionalInfo { get; set; }

        public DateTime From { get; set; }

        public DateTime To { get; set; }

        public ReservationStatus Status { get; set; }

        public int Adults { get; set; }

        public int Children { get; set; }

        public int Infants { get; set; }
    }
}
