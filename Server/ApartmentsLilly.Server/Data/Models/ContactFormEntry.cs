namespace ApartmentsLilly.Server.Data.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;

    public class ContactFormEntry
    {
        public ContactFormEntry()
        {
            this.CreatedOn = DateTime.UtcNow;
        }

        public int Id { get; set; }

        public string AuthUserId { get; set; }

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
        [MinLength(20)]
        [MaxLength(10000)]
        public string Content { get; set; }

        public string Ip { get; set; }

        public bool IsReplyed { get; set; }

        [MinLength(5)]
        [MaxLength(10000)]
        public string Reply { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ReplyedOn { get; set; }
    }
}

