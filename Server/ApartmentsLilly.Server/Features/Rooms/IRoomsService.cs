namespace ApartmentsLilly.Server.Features.Rooms
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Infrastructure.Services;

    public interface IRoomsService
    {
        Task<Result> Create(string name, int type, bool isSleepable, int apartmentId);

        Task<IEnumerable<T>> GetAllByApartmentId<T>(int apartmentId);

        Task<T> GetById<T>(int id);

        Task<Result> Update(int id, string name, int? type, bool isSleepable);

        Task<Result> Delete(int id);

        Task<bool> Exists(int id);
    }
}
