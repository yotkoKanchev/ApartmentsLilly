namespace ApartmentsLilly.Server.Features.Amenities
{
    using System.Threading.Tasks;
    using Amenities.Models;
    using Infrastructure.Services;

    public interface IAmenitiesService
    {
        Task<Result> Create(int apartmentId, string name, int importance);

        Task<Result> Update(int apartmentId, int amenityId, string name, int importance);

        Task<Result> Delete(int apartmentId, int amenityId);

        Task<AmenityDetailsServiceModel> GetById(int apartmentId, int amenityId);
    }
}
