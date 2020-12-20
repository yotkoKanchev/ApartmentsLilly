namespace ApartmentsLilly.Server.Features.Apartments
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Infrastructure.Services;

    public interface IApartmentsService
    {
        Task<Result> Create(int addressId, string name, string description, string entry, int? floor, string number,
            double? size, double? basePrice, int? maxOccupants, string mainImageUrl);
        // TODO GetAll should accept cityName as parameter!!!
        Task<IEnumerable<T>> GetAll<T>();

        Task<IEnumerable<T>> GetAllAvailable<T>(DateTime startDate, DateTime endDate);

        Task<T> GetById<T>(int id);

        Task<Result> Delete(int id);

        Task<Result> Update(int id, string name, string description, string entry, int floor, string number,
            double size, double basePrice, int maxOccupants, string mainImageUrl, int addressId);

        Task<bool> Exists(int apartmentId);

        Task<Result> ChangeAddress(int apartmentId, int addressId);
    }
}
