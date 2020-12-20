namespace ApartmentsLilly.Server.Features.Amenities
{
    using System.Linq;
    using System.Threading.Tasks;
    using Data;
    using Data.Models.Amenities;
    using Data.Models.Mappings;
    using Infrastructure.Mapping;
    using Infrastructure.Services;
    using Microsoft.EntityFrameworkCore;

    public class AmenitiesService : IAmenitiesService
    {
        private readonly ApartmentsLillyDbContext data;

        public AmenitiesService(ApartmentsLillyDbContext data)
        {
            this.data = data;
        }

        public async Task<Result> Create(int apartmentId, string name, int importance)
        {
            if (await data.Apartments.AnyAsync(a => a.Id == apartmentId) == false)
            {
                return $"Apartment with Id: {apartmentId} does not exists.";
            }

            var nameToLower = name.ToLower();
            var amenity = await GetAmenity(nameToLower);
            var amenityId = amenity != null ? amenity.Id : await this.CreateAmenity(nameToLower);

            if (await this.Exists(apartmentId, amenityId) == false)
            {
                var apartmentAmenity = new ApartmentAmenity
                {
                    ApartmentId = apartmentId,
                    AmenityId = amenityId,
                    Importance = (AmenityImportance)importance,
                };

                this.data.ApartmentAmenities.Add(apartmentAmenity);
                await this.data.SaveChangesAsync();

                return true;
            }
            else
            {
                return "This apartment has this amenity already.";
            }
        }

        public async Task<Result> Update(int apartmentId, int amenityId, string name, int importance)
        {
            var apartmentAmenity = await this.ById(apartmentId, amenityId).FirstOrDefaultAsync();

            if (apartmentAmenity == null)
            {
                return $"Amenity with ID: {amenityId} does not below to apartment with ID: {apartmentId}.";
            }

            var newName = name.ToLower();
            var amenity = await GetAmenity(newName);
            var newAmenityId = amenity != null ? amenity.Id : await this.CreateAmenity(newName);

            if (newAmenityId != amenityId)
            {
                await this.Delete(apartmentId, amenityId);
                await this.Create(apartmentId, newName, importance);
            }
            else
            {
                apartmentAmenity.Importance = (AmenityImportance)importance;
            }

            await this.data.SaveChangesAsync();

            return true;
        }

        public async Task<Result> Delete(int apartmentId, int amenityId)
        {
            var apartmentAmenity = await this.ById(apartmentId, amenityId).FirstOrDefaultAsync();

            if (apartmentAmenity == null)
            {
                return $"Amenity with ID: {amenityId} does not below to apartment with ID: {apartmentId}.";
            }

            this.data.ApartmentAmenities.Remove(apartmentAmenity);
            await data.SaveChangesAsync();
            await this.DeleteAmenity(amenityId);

            return true;
        }

        public async Task<T> GetById<T>(int apartmentId, int amenityId)
        {
            return await this.ById(apartmentId, amenityId)
                .To<T>()
                .FirstOrDefaultAsync();
        }

        private IQueryable<ApartmentAmenity> ById(int apartmentId, int amenityId)
        {
            return this.data
                .ApartmentAmenities
                .Where(aa => aa.ApartmentId == apartmentId && aa.AmenityId == amenityId);
        }

        private async Task<bool> Exists(int apartmentId, int amenityId)
        {
            return await this.data.ApartmentAmenities
                .AnyAsync(aa => aa.ApartmentId == apartmentId && aa.AmenityId == amenityId);
        }

        private async Task DeleteAmenity(int amenityId)
        {
            var amenity = await this.data
                .Amenities
                .FirstOrDefaultAsync(a => a.Id == amenityId);

            if (!await this.data.ApartmentAmenities.AnyAsync(aa => aa.AmenityId == amenityId))
            {
                this.data.Amenities.Remove(amenity);
                await data.SaveChangesAsync();
            }
        }

        private async Task<int> CreateAmenity(string nameToLower)
        {
            var amenity = new Amenity
            {
                Name = nameToLower,
            };

            this.data.Amenities.Add(amenity);
            await this.data.SaveChangesAsync();

            return amenity.Id;
        }

        private async Task<Amenity> GetAmenity(string nameToLower)
        {
            return await this.data.Amenities.FirstOrDefaultAsync(a => a.Name == nameToLower);
        }
    }
}
