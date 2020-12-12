namespace ApartmentsLilly.Server.Features.Amenities.Models
{
    public class CreateAmenityRequestModel
    {
        public string Name { get; set; }

        public string Importance { get; set; }

        public int ApartmentId { get; set; }
    }
}
