namespace ApartmentsLilly.Server.Features.Rooms
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Infrastructure.Services;
    using Models;

    public interface IRoomsService
    {
        Task<Result> Create(string name, int type, int apartmentId);

        Task<IEnumerable<RoomListingServiceModel>> GetAllByApartmentId(int apartmentId);

        Task<RoomDetailsServiceModel> GetById(int id);

        Task<Result> Update(int id, string name, string type);

        Task<Result> Delete(int id);
    }
}
