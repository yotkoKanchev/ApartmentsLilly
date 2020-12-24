namespace ApartmentsLilly.Server.Features.Amenities
{
    using System.Threading.Tasks;
    using Infrastructure.Services;

    public interface IAmenitiesService
    {
        Task<Result> Create(int? apartmentId, int? roomId, string name, int importance);

        Task<Result> Delete(int? apartmentId, int? roomId, int amenityId);
    }
}
