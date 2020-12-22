namespace ApartmentsLilly.Server.Features.Apartments
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Data;
    using Data.Models;
    using Features.Addresses;
    using Features.Amenities;
    using Infrastructure.Mapping;
    using Infrastructure.Services;
    using Microsoft.EntityFrameworkCore;

    public class ApartmentsService : IApartmentsService
    {
        private readonly ApartmentsLillyDbContext data;
        private readonly IAddressService addresses;
        private readonly IAmenitiesService amenities;

        public ApartmentsService(ApartmentsLillyDbContext data, IAddressService addresses, IAmenitiesService amenities)
        {
            this.data = data;
            this.addresses = addresses;
            this.amenities = amenities;
        }

        public async Task<Result> Create(int addressId, string name, string description, string entry, int? floor, string number, double? size,
            double? basePrice, int? maxOccupants, string mainImageUrl)
        {
            var isAddressExists = await this.addresses.Exists(addressId);

            if (isAddressExists == false)
            {
                return $"Address with Id: {addressId} does not exists.";
            }

            var apartment = new Apartment
            {
                AddressId = addressId,
                Name = name.ToLower(),
                Description = description,
                Entry = entry,
                Floor = floor.Value,
                Number = number,
                Size = size.Value,
                BasePrice = basePrice.Value,
                MaxOccupants = maxOccupants.Value,
                MainImageUrl = mainImageUrl,
            };

            await this.data.AddAsync(apartment);
            await this.data.SaveChangesAsync();

            return apartment.Id;
        }

        public async Task<IEnumerable<T>> GetAll<T>()
        {
            return await this.data
                .Apartments
                .OrderBy(a => a.Name)
                .To<T>()
                .ToListAsync();
        }

        public async Task<T> GetById<T>(int id)
        {
            return await this.GetApartment(id)
                .To<T>()
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

            var rooms = await this.data.Rooms
                .Where(r => r.ApartmentId == id)
                .ToListAsync();

            foreach (var room in apartment.Rooms)
            {
                this.data.Rooms.Remove(room);
            }

            var apartmentAmenities = await this.data.ApartmentAmenities
                .Where(aa => aa.ApartmentId == id)
                .ToListAsync();

            foreach (var apartmentAmenity in apartment.Amenities)
            {
                await this.amenities.Delete(apartmentAmenity.AmenityId, apartmentAmenity.AmenityId);
            }

            this.data.Apartments.Remove(apartment);
            await this.data.SaveChangesAsync();

            await this.addresses.Delete(apartment.AddressId);

            return true;
        }

        public async Task<Result> Update(int id, string name, string description, string entry, int floor, string number,
            double size, double basePrice, int maxOccupants, string mainImageUrl, int addressId)
        {
            var apartment = await this.GetApartment(id)
                .FirstOrDefaultAsync();

            if (apartment == null)
            {
                return $"Apartment with Id: {id} does not exists.";
            }

            apartment.Name = name.ToLower();
            apartment.Description = description;
            apartment.Entry = entry;
            apartment.Floor = floor;
            apartment.Number = number;
            apartment.Size = size;
            apartment.BasePrice = basePrice;
            apartment.MaxOccupants = maxOccupants;
            apartment.MainImageUrl = mainImageUrl;

            if (await this.addresses.Exists(addressId) == true)
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

        public async Task<IEnumerable<T>> GetAllAvailable<T>(System.DateTime startDate, System.DateTime endDate)
        {
            return await this.data
                .Apartments
                .Where(a => a.Rooms.Any())
                .Where(a => !a.Bookings
                    .Any(b => (b.StartDate >= startDate && b.EndDate <= startDate) &&
                              (b.StartDate >= endDate && b.EndDate <= endDate)))
                .OrderBy(a => a.Name)
                .To<T>()
                .ToListAsync();
        }

        public async Task<Result> ChangeAddress(int apartmentId, int addressId)
        {
            var apartment = await this.GetApartment(apartmentId)
                .FirstOrDefaultAsync();

            if (apartment == null)
            {
                return $"Apartment with Id: {apartmentId} does not exists.";
            }

            if (!await this.addresses.Exists(addressId))
            {
                return $"Address with Id: {addressId} does not exists.";
            }

            apartment.AddressId = addressId;
            await this.data.SaveChangesAsync();

            return true;
        }

        private IQueryable<Apartment> GetApartment(int id)
        {
            return this.data
                .Apartments
                .Where(a => a.Id == id);
        }
    }
}
