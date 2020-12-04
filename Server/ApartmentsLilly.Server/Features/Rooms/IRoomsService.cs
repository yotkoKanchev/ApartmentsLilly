namespace ApartmentsLilly.Server.Features.Rooms
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Data.Models.Rooms;
    using Infrastructure.Services;
    using Models;

    public interface IRoomsService
    {
        Task<Result> Create(RoomType type, int apartmentId);

        Task<IEnumerable<RoomListingServiceModel>> GetAllByApartmentId(int apartmentId);

        Task<RoomDetailsServiceModel> GetById(string id);

        Task<Result> Update(string id, bool isSleepable, RoomType type);
        
        Task<Result> Delete(string id);

        Task<bool> Exists(string id);
    }
}
