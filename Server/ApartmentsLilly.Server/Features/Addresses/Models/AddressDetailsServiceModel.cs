namespace ApartmentsLilly.Server.Features.Addresses.Models
{
    using Data.Models;
    using Infrastructure.Mapping;

    public class AddressDetailsServiceModel : IMapFrom<Address>
    {
        public string Id { get; set; }

        public string Country { get; set; }

        public string City { get; set; }

        public string PostalCode { get; set; }

        public string Neighborhood { get; set; }

        public string StreetAddress { get; set; }
    }
}
