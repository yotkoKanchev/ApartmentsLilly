namespace ApartmentsLilly.Server.Features.Addresses
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Infrastructure.Services;
    using Models;

    public interface IAddressService
    {
        Task<string> Create(string country, string city, string postalCode, string neighborhood, string streetAddress);

        Task<AddressDetailsServiceModel> Details(string id);

        Task<Result> Update(string id, string country, string city, string postalCode, string neighborhood, string streetAddress);

        Task<Result> Delete(string id);

        Task<IEnumerable<AddressDetailsServiceModel>> GetAll();
    }
}
