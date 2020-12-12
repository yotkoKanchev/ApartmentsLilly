namespace ApartmentsLilly.Server.Features.Amenities
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Amenities.Models;
    using Data;
    using Data.Models.Amenities;
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

        public async Task<int> Create(string name, int importance)
        {
            int id;

            if (await this.Exists(name) == false)
            {
                var amenity = new Amenity
                {
                    Name = name,
                    Importance = (AmenityImportance)importance
                };

                this.data.Amenities.Add(amenity);
                await this.data.SaveChangesAsync();
                id = amenity.Id;
            }
            else
            {
                id = await this.GetIdByName(name);
            }

            return id;
        }

        public async Task<Result> Update(int id, string name)
        {
            var amenity = await this.GetIdById(id);

            if (amenity == null)
            {
                return $"Amenity with {id} does not exists.";
            }

            amenity.Name = name;
            await this.data.SaveChangesAsync();

            return true;
        }

        public async Task<IEnumerable<AmenitiesListingServiceModel>> GetAllByApartmentId(int apartmentId)
        {
            return await this.data
                .Apartments
                .Where(a => a.Id == apartmentId)
                .SelectMany(a => a.Amenities
                    .Select(aa => aa.Amenity)
                 )
                .OrderByDescending(a => a.Importance)
                .To<AmenitiesListingServiceModel>()
                .ToListAsync();
        }

        private async Task<Amenity> GetIdById(int id)
        {
            return await this.data
                .Amenities
                .FindAsync(id);
        }

        private async Task<int> GetIdByName(string name)
        {
            return await this.data.Amenities
                .Where(a => a.Name == name)
                .Select(a => a.Id)
                .FirstAsync();
        }

        private async Task<bool> Exists(string name)
        {
            return await this.data.Amenities
                .AnyAsync(a => a.Name == name);
        }

        public async Task<Result> Delete(int id)
        {
            var amenity = await this.data
                .Amenities
                .FirstOrDefaultAsync(a => a.Id == id);

            if (amenity == null)
            {
                return $"Amenity with Id {id} does not exists";
            }

            if (!await this.data.ApartmentAmenities.AnyAsync(aa => aa.AmenityId == id))
            {
                this.data.Amenities.Remove(amenity);
                await this.data.SaveChangesAsync();
            }

            return true;
        }

        public async Task<AmenityDetailsServiceModel> GetById(int id)
        {
            return await this.ById(id)
                .To<AmenityDetailsServiceModel>()
                .FirstOrDefaultAsync();
        }

        private IQueryable<Amenity> ById(int id)
        {
            return this.data
                .Amenities
                .Where(r => r.Id == id);
        }
    }
}
