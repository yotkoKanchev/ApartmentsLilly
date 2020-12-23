namespace ApartmentsLilly.Server.Data.Models
{
    using System.ComponentModel.DataAnnotations;
    using Base;

    using static Data.Validation.User;

    public class Profile : DeletableEntity
    {
        [Key]
        [Required]
        public string UserId { get; set; }

        public virtual User User { get; set; }

        [MaxLength(MaxNameLength)]
        public string FirstName { get; set; }

        [MaxLength(MaxNameLength)]
        public string LastName { get; set; }

        //public string AvatarId { get; set; }

        //public Image AvatarImage { get; set; }

        [Url]
        public string AvatarUrl { get; set; }

        [MaxLength(20)]
        [MinLength(4)]
        public string PhoneNumber { get; set; }
    }
}
