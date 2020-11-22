namespace ApartmentsLilly.Server.Features.Apartments
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Data;
    using Data.Models;
    using Features.Addresses;
    using Features.Apartments.Models;
    using Infrastructure.Mapping;
    using Infrastructure.Services;
    using Microsoft.EntityFrameworkCore;

    public class ApartmentsService : IApartmentsService
    {
        private readonly ApartmentsLillyDbContext data;
        private readonly IAddressService address;

        public ApartmentsService(ApartmentsLillyDbContext data, IAddressService address)
        {
            this.data = data;
            this.address = address;
        }

        public async Task<Result> Create(string addressId, string name, string description, string entry, int? floor, string number, double? size,
            double? basePrice, bool hasTerrace, int? maxOccupants, string mainImageUrl)
        {
            var isAddressExists = await this.address.Exists(addressId);

            if (isAddressExists == false)
            {
                return $"Address with Id: {addressId} does not exists.";
            }

            var apartment = new Apartment
            {
                AddressId = addressId,
                Name = name,
                Description = description,
                Entry = entry,
                Floor = floor.Value,
                Number = number,
                Size = size.Value,
                BasePrice = basePrice.Value,
                HasTerrace = hasTerrace,
                MaxOccupants = maxOccupants.Value,
                MainImageUrl = mainImageUrl,
            };

            this.data.Add(apartment);
            await this.data.SaveChangesAsync();

            return apartment.Id;
        }

        public async Task<IEnumerable<ApartmentListingServiceModel>> GetAll()
        {
            return await this.data
                .Apartments
                .OrderByDescending(a => a.Name)
                .To<ApartmentListingServiceModel>()
                .ToListAsync();
        }

        public async Task<ApartmentDetailsServiceModel> GetById(int id)
        {
            return await this.GetApartment(id)
                .To<ApartmentDetailsServiceModel>()
                .FirstOrDefaultAsync();
        }

        public async Task<Result> Delete(int id)
        {
            var apartment = await this.GetApartment(id)
                .FirstOrDefaultAsync();

            if (apartment == null)
            {
                return $"Apartment with Id: {id} does not exists.";
            }

            this.data.Apartments.Remove(apartment);

            await this.data.SaveChangesAsync();

            return true;
        }

        public async Task<Result> Update(int id, string name, string description, string entry, int floor, string number, 
            double size, double basePrice, bool hasTerrace, int maxOccupants, string mainImageUrl, string addressId)
        {
            var apartment = await this.GetApartment(id)
                .FirstOrDefaultAsync();

            if (apartment == null)
            {
                return $"Apartment with Id: {id} does not exists.";
            }

            apartment.Name = name;
            apartment.Description = description;
            apartment.Entry = entry;
            apartment.Floor = floor;
            apartment.Number = number;
            apartment.Size = size;
            apartment.BasePrice = basePrice;
            apartment.HasTerrace = hasTerrace;
            apartment.MaxOccupants = maxOccupants;
            apartment.MainImageUrl = mainImageUrl;

            if (await this.address.Exists(addressId) == true)
            {
                apartment.AddressId = addressId;
            }

            await this.data.SaveChangesAsync();

            return true;
        }

        public async Task<bool> Exists(int apartmentId)
        {
            return await this.data
                .Apartments
                .AnyAsync(a => a.Id == apartmentId);
        }

        private IQueryable<Apartment> GetApartment(int id)
        {
            return this.data
                .Apartments
                .Where(a => a.Id == id);
        }
    }
}
