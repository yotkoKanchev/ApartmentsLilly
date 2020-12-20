namespace ApartmentsLilly.Server.Features.Beds
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Data.Models.Beds;
    using Infrastructure.Services;

    public interface IBedsService
    {
        Task<Result> Create(int roomId, BedType bedType);

        Task<T> GetById<T>(int id);

        Task<IEnumerable<T>> GetByApartmentId<T>(int apartmentId);

        Task<Result> Delete(int id);

        Task<Result> Update(int id, BedType bedType);
    }
}
