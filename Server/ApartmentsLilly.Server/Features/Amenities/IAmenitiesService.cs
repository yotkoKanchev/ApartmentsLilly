namespace ApartmentsLilly.Server.Features.Amenities
{
    using System.Threading.Tasks;
    using Infrastructure.Services;

    public interface IAmenitiesService
    {
        Task<Result> Create(int? apartmentId, int? roomId, string name, int importance);

        //Task<T> GetById<T>(int? apartmentId, int? roomId, int amenityId);

        //Task<Result> Update(int? apartmentId, int? roomId, int amenityId, string name, int importance);

        Task<Result> Delete(int? apartmentId, int? roomId, int amenityId);
    }
}
