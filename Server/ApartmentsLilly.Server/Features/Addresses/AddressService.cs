namespace ApartmentsLilly.Server.Features.Addresses
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Linq;
    using Data;
    using Data.Models;
    using Models;
    using Microsoft.EntityFrameworkCore;
    using Infrastructure.Mapping;
    using Infrastructure.Services;

    public class AddressService : IAddressService
    {
        private readonly ApartmentsLillyDbContext data;

        public AddressService(ApartmentsLillyDbContext data)
        {
            this.data = data;
        }

        public async Task<string> Create(string country, string city, string cityImageUrl, string postalCode, string neighborhood, string streetAddress)
        {
            var address = new Address
            {
                Country = country,
                City = city,
                CityImageUrl = cityImageUrl,
                PostalCode = postalCode,
                Neighborhood = neighborhood,
                StreetAddress = streetAddress,
            };

            this.data.Add(address);

            await this.data.SaveChangesAsync();

            return address.Id;
        }

        public async Task<AddressDetailsServiceModel> Details(string id)
        {
            return await this.data
                .Addresses
                .Where(a => a.Id == id)
                .To<AddressDetailsServiceModel>()
                .FirstOrDefaultAsync();
        }


        public async Task<Result> Update(string id, string country, string city, string cityImageUrl, string postalCode, string neighborhood, string streetAddress)
        {
            var address = await this.GetById(id);

            if (address == null)
            {
                return $"Address with Id: {id} does not exists.";
            }

            address.Country = country;
            address.City = city;
            address.CityImageUrl = cityImageUrl;
            address.PostalCode = postalCode;
            address.Neighborhood = neighborhood;
            address.StreetAddress = streetAddress;

            await this.data.SaveChangesAsync();

            return true;
        }

        public async Task<Result> Delete(string id)
        {
            var address = await this.GetById(id);

            if (address == null)
            {
                return $"Address with Id: {id} does not exists.";
            }

            this.data.Addresses.Remove(address);

            await this.data.SaveChangesAsync();

            return true;
        }

        public async Task<IEnumerable<AddressDetailsServiceModel>> GetAll()
        {
            return await this.data
                  .Addresses
                  .OrderByDescending(x =>x.Apartments.Count)
                  .To<AddressDetailsServiceModel>()
                  .ToListAsync();
        }

        private async Task<Address> GetById(string id)
        {
            return await this.data
                .Addresses
                .FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<bool> Exists(string addressId)
        {
            return await this.data
                .Addresses.AnyAsync(a => a.Id == addressId);
        }
    }
}
