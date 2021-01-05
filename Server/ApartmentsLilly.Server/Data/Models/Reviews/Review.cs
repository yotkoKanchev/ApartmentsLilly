namespace ApartmentsLilly.Server.Data.Models.Reviews
{
    using ApartmentsLilly.Server.Data.Models.Reservations;
    using Base;

    public class Review : DeletableEntity
    {
        public int Id { get; set; }

        public string Description { get; set; }

        public Status Status { get; set; }

        public string UserId { get; set; }

        public User User { get; set; }

        public int ApartmentId { get; set; }

        public virtual Apartment Apartment { get; set; }

        public int ReservationId { get; set; }

        public virtual Reservation Reservation { get; set; }
    }
}
