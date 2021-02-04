namespace ApartmentsLilly.Server.Features.Contacts.Models
{
    using System;
    using Data.Models;
    using Infrastructure.Mapping;

    public class ContactEntryListingServiceModel : IMapFrom<ContactFormEntry>
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Title { get; set; }

        public string Ip { get; set; }

        public DateTime CreatedOn { get; set; }
    }
}
