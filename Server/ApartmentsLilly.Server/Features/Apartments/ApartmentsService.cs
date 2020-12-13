namespace ApartmentsLilly.Server.Features.Apartments
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Data;
    using Data.Models;
    using Data.Models.Amenities;
    using Data.Models.Mappings;
    using Features.Addresses;
    using Features.Amenities;
    using Features.Apartments.Models;
    using Infrastructure.Mapping;
    using Infrastructure.Services;
    using Microsoft.EntityFrameworkCore;

    public class ApartmentsService : IApartmentsService
    {
        private readonly ApartmentsLillyDbContext data;
        private readonly IAddressService address;
        private readonly IAmenitiesService amenities;

        public ApartmentsService(ApartmentsLillyDbContext data, IAddressService address, IAmenitiesService amenities)
        {
            this.data = data;
            this.address = address;
            this.amenities = amenities;
        }

        public async Task<Result> Create(int addressId, string name, string description, string entry, int? floor, string number, double? size,
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
                .OrderBy(a => a.Name)
                .To<ApartmentListingServiceModel>()
                .ToListAsync();
        }

        public async Task<ApartmentDetailsServiceModel> GetById(int id)
        {
            var result = await this.GetApartment(id)
                .To<ApartmentDetailsServiceModel>()
                .FirstOrDefaultAsync();

            foreach (var amenity in result.Amenities)
            {
                amenity.Importance = await this.data.ApartmentAmenities
                    .Where(aa => aa.AmenityId == amenity.Id)
                    .Select(aa => aa.Importance.ToString())
                    .FirstAsync();
            }

            return result;
        }

        public async Task<Result> Delete(int id)
        {
            var apartment = await this.GetApartment(id)
                .FirstOrDefaultAsync();

            if (apartment == null)
            {
                return $"Apartment with Id: {id} does not exists.";
            }

            var rooms = await this.data.Rooms.Where(r => r.ApartmentId == id).ToListAsync();

            foreach (var room in rooms)
            {
                this.data.Rooms.Remove(room);
            }

            var apartmentAmenities = await this.data.ApartmentAmenities.Where(aa => aa.ApartmentId == id).ToListAsync();

            var amenityIds = new List<int>();
            foreach (var apartmentAmenity in apartmentAmenities)
            {
                amenityIds.Add(apartmentAmenity.AmenityId);
                this.data.ApartmentAmenities.Remove(apartmentAmenity);
            }

            await this.data.SaveChangesAsync();

            foreach (var amenityId in amenityIds)
            {
                await this.amenities.Delete(amenityId);
            }

            await this.address.Delete(apartment.AddressId);

            this.data.Apartments.Remove(apartment);
            await this.data.SaveChangesAsync();

            return true;
        }

        public async Task<Result> Update(int id, string name, string description, string entry, int floor, string number,
            double size, double basePrice, bool hasTerrace, int maxOccupants, string mainImageUrl, int addressId)
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

        public async Task<IEnumerable<ApartmentListingServiceModel>> GetAllAvailable(System.DateTime startDate, System.DateTime endDate)
        {
            return await this.data
                .Apartments
                .Where(a => a.Rooms.Any())
                .Where(a => !a.Bookings
                    .Any(b => (b.StartDate >= startDate && b.EndDate <= startDate) &&
                              (b.StartDate >= endDate && b.EndDate <= endDate)))
                .OrderBy(a => a.Name)
                .To<ApartmentListingServiceModel>()
                .ToListAsync();
        }

        public async Task<Result> CreateApartmentAmenity(int apartmentId, int amenityId, int importance)
        {
            if (await this.Exists(apartmentId) == false)
            {
                return $"Apartment with Id: {apartmentId} does not exists.";
            }

            var apartmentAmenity = await this.data.ApartmentAmenities.FirstOrDefaultAsync(aa => aa.ApartmentId == apartmentId && aa.AmenityId == amenityId);

            if (apartmentAmenity == null)
            {
                apartmentAmenity = new ApartmentAmenity
                {
                    ApartmentId = apartmentId,
                    AmenityId = amenityId,
                    Importance = (AmenityImportance)importance,
                };

                this.data.ApartmentAmenities.Add(apartmentAmenity);
                await this.data.SaveChangesAsync();
            }

            return true;
        }

        public async Task<Result> DeleteApartmentAmenity(int apartmentId, int amenityId)
        {
            if (await this.Exists(apartmentId) == false)
            {
                return $"Apartment with Id: {apartmentId} does not exists.";
            }

            var apartmentAmenity = await this.data
                .ApartmentAmenities
                .FirstOrDefaultAsync(aa => aa.ApartmentId == apartmentId && aa.AmenityId == amenityId);

            if (apartmentAmenity == null)
            {
                return $"Amenity with Id: {amenityId} does not exists.";
            }

            this.data.ApartmentAmenities.Remove(apartmentAmenity);
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
