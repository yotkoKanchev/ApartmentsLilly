namespace ApartmentsLilly.Server.Features.Apartments.Models
{
    using System.ComponentModel.DataAnnotations;

    using static Data.Validation.Apartment;
    public class UpdateApartmentRequestModel
    {
        [Required]
        [MaxLength(MaxNameLength)]
        [MinLength(MinNameLength)]
        public string Name { get; set; }

        [Required]
        [MaxLength(MaxDescriptionLength)]
        public string Description { get; set; }

        public string Entry { get; set; }

        public int Floor { get; set; }

        public string Number { get; set; }

        public double Size { get; set; }

        public double BasePrice { get; set; }

        public bool HasTerrace { get; set; }

        public int MaxOccupants { get; set; }

        public string MainImageUrl { get; set; }

        [Required]
        public string AddressId { get; set; }
    }
}
