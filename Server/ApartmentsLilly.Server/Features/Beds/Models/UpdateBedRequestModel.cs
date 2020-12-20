namespace ApartmentsLilly.Server.Features.Beds.Models
{
    using Data.Models.Beds;

    public class UpdateBedRequestModel
    {
        public int Id { get; set; }

        public BedType BedType {get;set;}
    }
}
