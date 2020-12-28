namespace ApartmentsLilly.Server.Features.Reservations.Models
{
    public class CreateRequestNewUserResponceModel : CreateRequestResponceModel
    {
        public string Email { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }
    }
}
