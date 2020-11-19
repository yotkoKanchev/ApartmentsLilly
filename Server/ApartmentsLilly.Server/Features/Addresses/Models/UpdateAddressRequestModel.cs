namespace ApartmentsLilly.Server.Features.Addresses.Models
{
    using System.ComponentModel.DataAnnotations;

    using static Data.Validation.Address;
    public class UpdateAddressRequestModel
    {
        [Required]
        [MinLength(MinLength)]
        [MaxLength(MaxLength)]
        public string Country { get; set; }

        [Required]
        [MinLength(MinLength)]
        [MaxLength(MaxLength)]
        public string City { get; set; }

        public string CityImageUrl { get; set; }

        [MaxLength(MaxPostalCodeLength)]
        public string PostalCode { get; set; }

        [MaxLength(MaxLength)]
        public string Neighborhood { get; set; }

        [Required]
        [MinLength(MinLength)]
        [MaxLength(MaxStreetAddressLength)]
        public string StreetAddress { get; set; }
    }
}
