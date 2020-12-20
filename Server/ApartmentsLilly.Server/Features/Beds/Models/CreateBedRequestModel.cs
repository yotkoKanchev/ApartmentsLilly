namespace ApartmentsLilly.Server.Features.Beds.Models
{
    using Data.Models.Beds;

    public class CreateBedRequestModel
    {
        public int ApartmentId { get; set; }

        public int RoomId { get; set; }

        public BedType BedType { get; set; }
    }
}
