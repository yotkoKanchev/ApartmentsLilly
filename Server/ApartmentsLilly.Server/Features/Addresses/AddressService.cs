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

        public async Task<int> Create(string country, string city, string postalCode, string neighborhood, string streetAddress)
        {
            var address = new Address
            {
                Country = country,
                City = city,
                PostalCode = postalCode,
                Neighborhood = neighborhood,
                StreetAddress = streetAddress,
            };

            this.data.Add(address);

            await this.data.SaveChangesAsync();

            return address.Id;
        }

        public async Task<AddressDetailsServiceModel> Details(int id)
        {
            return await this.data
                .Addresses
                .Where(a => a.Id == id)
                .To<AddressDetailsServiceModel>()
                .FirstOrDefaultAsync();
        }


        public async Task<Result> Update(int id, string country, string city, string postalCode, string neighborhood, string streetAddress)
        {
            var address = await this.GetById(id);

            if (address == null)
            {
                return $"Address with Id: {id} does not exists.";
            }

            address.Country = country;
            address.City = city;
            address.PostalCode = postalCode;
            address.Neighborhood = neighborhood;
            address.StreetAddress = streetAddress;

            await this.data.SaveChangesAsync();

            return true;
        }

        public async Task<Result> Delete(int id)
        {
            var address = await this.GetById(id);

            if (address == null)
            {
                return $"Address with Id: {id} does not exists.";
            }

            if (await this.data.Addresses.Where(a => a.Id == id).Select(a => a.Apartments).CountAsync() == 1)
            {
                this.data.Addresses.Remove(address);

                await this.data.SaveChangesAsync();

                return true;
            }

            return "There are other apartments located on this address";
        }

        public async Task<IEnumerable<AddressDetailsServiceModel>> GetAll()
        {
            return await this.data
                  .Addresses
                  .OrderByDescending(x => x.Apartments.Count)
                  .To<AddressDetailsServiceModel>()
                  .ToListAsync();
        }

        private async Task<Address> GetById(int id)
        {
            return await this.data
                .Addresses
                .FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<bool> Exists(int id)
        {
            return await this.data
                .Addresses
                .AnyAsync(a => a.Id == id);
        }
    }
}
