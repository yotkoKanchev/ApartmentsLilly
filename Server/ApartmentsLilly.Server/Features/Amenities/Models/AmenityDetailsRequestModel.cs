namespace ApartmentsLilly.Server.Features.Amenities.Models
{
    public class AmenityDetailsRequestModel
    {
        public int Id { get; set; }

        public int? ApartmentId { get; set; }

        public int? RoomId { get; set; }
    }
}
