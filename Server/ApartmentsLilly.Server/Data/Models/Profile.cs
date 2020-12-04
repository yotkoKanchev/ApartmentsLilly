namespace ApartmentsLilly.Server.Data.Models
{
    using System.ComponentModel.DataAnnotations;

    using static Data.Validation.User;

    public class Profile
    {
        [Key]
        [Required]
        public string UserId { get; set; }

        public virtual User User { get; set; }

        [MaxLength(MaxNameLength)]
        public string FirstName { get; set; }

        [MaxLength(MaxNameLength)]
        public string LastName { get; set; }

        public string ImageId { get; set; }

        public Image MainImage { get; set; }

        public Gender Gender { get; set; }
    }
}
