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

            await this.data.AddAsync(address);
            await this.data.SaveChangesAsync();

            return address.Id;
        }

        public async Task<T> GetById<T>(int id)
        {
            return await this.data
                .Addresses
                .Where(a => a.Id == id)
                .To<T>()
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

            if (!await this.data.Addresses.AnyAsync(a => a.Id == id && a.Apartments.Any()))
            {
                this.data.Addresses.Remove(address);

                await this.data.SaveChangesAsync();

                return true;
            }

            return "There are other apartments located on this address";
        }

        public async Task<IEnumerable<T>> GetAll<T>()
        {
            return await this.data
                  .Addresses
                  .OrderByDescending(x => x.Apartments.Count)
                  .To<T>()
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
