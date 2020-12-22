namespace ApartmentsLilly.Server.Features.Identity.Models
{
    using System.ComponentModel.DataAnnotations;

    public class RegisterRequestModel
    {
        [Required]
        [MinLength(2)]
        public string UserName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(6)]
        public string Password { get; set; }

        [Required]
        [MinLength(6)]
        public string ConfirmPassword { get; set; }
    }
}
