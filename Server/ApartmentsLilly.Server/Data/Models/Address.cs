namespace ApartmentsLilly.Server.Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using Base;

    using static Data.Validation.Address;
    public class Address : DeletableEntity
    {
        public Address()
        {
            this.Id = Guid.NewGuid().ToString();
        }

        // TODO change ID to int
        public string Id { get; set; }

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

        public virtual ICollection<Apartment> Apartments { get; set; } = new HashSet<Apartment>();
    }
}
