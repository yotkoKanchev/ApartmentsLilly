namespace ApartmentsLilly.Server.Features.Profiles.Models
{
    public class ResetPasswordViewModel
    {
        public string Code { get; set; }

        public string ConfirmPassword { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }
    }
}
