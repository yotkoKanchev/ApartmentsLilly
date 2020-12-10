namespace ApartmentsLilly.Server.Features.Amenities.Models
{
    public class CreateAmenityRequestModel
    {
        public string Type { get; set; }

        public string Name { get; set; }

        public int? ApartmentId { get; set; }

        public int? RoomId { get; set; }
    }
}
