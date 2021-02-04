namespace ApartmentsLilly.Server.Features.Contacts.Models
{
    using System.ComponentModel.DataAnnotations;

    public class CreateContactEntryRequestModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(5)]
        [MaxLength(100)]
        public string Title { get; set; }

        [Required]
        [MinLength(10)]
        [MaxLength(10000)]

        public string Content { get; set; }
    }
}
