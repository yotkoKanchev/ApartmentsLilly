namespace ApartmentsLilly.Server.Features.Addresses
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Infrastructure.Services;
    using Models;

    public interface IAddressService
    {
        Task<int> Create(string country, string city, string postalCode, string neighborhood, string streetAddress);

        Task<AddressDetailsServiceModel> Details(int id);

        Task<Result> Update(int id, string country, string city, string postalCode, string neighborhood, string streetAddress);

        Task<Result> Delete(int id);

        Task<IEnumerable<AddressDetailsServiceModel>> GetAll();

        Task<bool> Exists(int id);
    }
}
