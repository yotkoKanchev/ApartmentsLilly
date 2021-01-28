namespace ApartmentsLilly.Server.Features.Contacts.Models
{
    using Data.Models;
    using Infrastructure.Mapping;

    public class ContactEntryDetailsServiceModel : IMapFrom<ContactFormEntry>
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }
    }
}
