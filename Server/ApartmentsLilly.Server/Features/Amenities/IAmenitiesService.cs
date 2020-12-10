namespace ApartmentsLilly.Server.Features.Amenities
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Amenities.Models;
    using Infrastructure.Services;

    public interface IAmenitiesService
    {
        Task<int> Create(string name);

        Task<Result> Update(int id, string name);

        Task<IEnumerable<AmenitiesListingServiceModel>> GetAllByApartmentId(int apartmentId);

        Task<IEnumerable<AmenitiesListingServiceModel>> GetAllByRoomId(int roomId);
        
        Task<Result> Delete(int amenityId);
    }
}
