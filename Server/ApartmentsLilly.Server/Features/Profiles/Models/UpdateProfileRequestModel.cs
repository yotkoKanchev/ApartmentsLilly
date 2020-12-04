namespace ApartmentsLilly.Server.Features.Profiles.Models
{
    using System.ComponentModel.DataAnnotations;
    using Data.Models;

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

        public string MainPhotoUrl { get; set; }

        public string WebSite { get; set; }

        //[MaxLength(MaxBiographyLength)]
        public string Biography { get; set; }

        public Gender Gender { get; set; }

        public bool IsPrivate { get; set; }
    }
}
