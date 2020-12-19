namespace ApartmentsLilly.Server.Features.Apartments
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Infrastructure.Services;
    using Models;

    public interface IApartmentsService
    {
        Task<Result> Create(int addressId, string name, string description, string entry, int? floor, string number,
            double? size, double? basePrice, int? maxOccupants, string mainImageUrl);
        // TODO GetAll should accept cityName as parameter!!!
        Task<IEnumerable<ApartmentListingServiceModel>> GetAll();

        Task<IEnumerable<ApartmentListingServiceModel>> GetAllAvailable(DateTime startDate, DateTime endDate);

        Task<ApartmentDetailsServiceModel> GetById(int id);

        Task<Result> Delete(int id);

        Task<Result> Update(int id, string name, string description, string entry, int floor, string number,
            double size, double basePrice, int maxOccupants, string mainImageUrl, int addressId);

        Task<bool> Exists(int apartmentId);

        Task<Result> ChangeAddress(int apartmentId, int addressId);
    }
}
