namespace ApartmentsLilly.Server.Features.Apartments.Models
{
    using System.ComponentModel.DataAnnotations;

    using static Data.Validation.Apartment;

    public class CreateApartmentRequestModel
    {
        [Required]
        public string AddressId { get; set; }

        [Required]
        [MaxLength(MaxNameLength)]
        [MinLength(MinNameLength)]
        public string Name { get; set; }

        [Required]
        [MaxLength(MaxDescriptionLength)]
        public string Description { get; set; }
        // TODO ADD all validations

        [MaxLength(EntryMaxLength)]
        public string Entry { get; set; }

        [Range(MinFloor, MaxFloor)]
        public int? Floor { get; set; }

        [MinLength(NumberMinLength)]
        [MaxLength(NumberMaxLength)]
        public string Number { get; set; }

        [Range(ZeroValue, MaxSize)]
        public double? Size { get; set; }

        [Range(ZeroValue, MaxBasePrice)]
        public double? BasePrice { get; set; }

        public bool HasTerrace { get; set; }

        [Range(ZeroValue, MaximumOccupants)]
        public int? MaxOccupants { get; set; }

        [RegularExpression(UrlPattern)]
        public string MainImageUrl { get; set; }
    }
}
