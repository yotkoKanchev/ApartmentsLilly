﻿namespace ApartmentsLilly.Server.Features.Addresses.Models
{
    using System.ComponentModel.DataAnnotations;

    using static Data.Validation.Address;

    public class CreateAddressRequestModel
    {
        [Required]
        [MinLength(MinLength)]
        [MaxLength(MaxLength)]
        public string Country { get; set; }

        [Required]
        [MinLength(MinLength)]
        [MaxLength(MaxLength)]
        public string City { get; set; }

        [MaxLength(MaxPostalCode)]
        public string PostalCode { get; set; }

        [MaxLength(MaxLength)]
        public string Neighborhood { get; set; }

        [Required]
        [MinLength(MinLength)]
        [MaxLength(MaxLength)]
        public string StreetAddress { get; set; }
    }
}
