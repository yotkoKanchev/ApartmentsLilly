namespace ApartmentsLilly.Server.Features.Identity.Models
{
    public class DeleteUserRequestModel
    {
        public string Password { get; set; }

        public string ConfirmPassword { get; set; }
    }
}
