namespace ApartmentsLilly.Server.Features.Reservations.Models
{
    public class CreateReservationNewUserResponceModel : CreateReservationResponceModel
    {
        public string UserName { get; set; }

        public string Password { get; set; }
    }
}
