namespace ApartmentsLilly.Server.Features.Apartments
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Infrastructure.Services;
    using Models;

    public interface IApartmentsService
    {
        Task<Result> Create(string addressId, string name, string description, string entry, int? floor, string number, 
            double? size, double? basePrice, bool hasTerrace, int? maxOccupants, string mainImageUrl);
        // TODO GetAll should accept cityName as parameter!!!
        Task<IEnumerable<ApartmentListingServiceModel>> GetAll();

        Task<ApartmentDetailsServiceModel> GetById(int id);

        Task<Result> Delete(int id);

        Task<Result> Update(int id, string name, string description, string entry, int floor, string number, 
            double size, double basePrice, bool hasTerrace, int maxOccupants, string mainImageUrl, string addressId);
    }
}
