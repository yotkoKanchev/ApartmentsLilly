namespace ApartmentsLilly.Server.Features.Contacts.Models
{
    using System.ComponentModel.DataAnnotations;

    public class ContactEntryReplyRequestModel
    {
        public int Id { get; set; }

        [MinLength(5)]
        [MaxLength(10000)]
        public string Reply { get; set; }
    }
}
