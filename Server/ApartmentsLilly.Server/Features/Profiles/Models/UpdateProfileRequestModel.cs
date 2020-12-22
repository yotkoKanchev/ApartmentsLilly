namespace ApartmentsLilly.Server.Features.Profiles.Models
{
    using System.ComponentModel.DataAnnotations;

    using static Data.Validation.User;

    public class UpdateProfileRequestModel
    {
        [EmailAddress]
        public string Email { get; set; }

        public string UserName { get; set; }

        [MaxLength(MaxNameLength)]
        public string FirstName { get; set; }
        
        [MaxLength(MaxNameLength)]
        public string LastName { get; set; }

        [Url]
        public string AvatarUrl { get; set; }

        [MaxLength(20)]
        [MinLength(4)]
        public string PhoneNumber { get; set; }
    }
}
