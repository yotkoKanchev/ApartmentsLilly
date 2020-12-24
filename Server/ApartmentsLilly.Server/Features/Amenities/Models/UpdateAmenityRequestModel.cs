namespace ApartmentsLilly.Server.Features.Amenities.Models
{
    public class UpdateAmenityRequestModel
    {
        public int? ApartmentId { get; set; }

        public int? RoomId { get; set; }

        public int AmenityId { get; set; }

        public string Name { get; set; }

        public int Importance { get; set; }
    }
}
