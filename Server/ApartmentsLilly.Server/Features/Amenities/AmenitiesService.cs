namespace ApartmentsLilly.Server.Features.Amenities
{
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

        public async Task<int> Create(string name)
        {
            var amenity = await this.data.Amenities.FirstOrDefaultAsync(a => a.Name == name);

            if (amenity == null)
            {
                amenity = new Amenity
                {
                    Name = name,
                };

                this.data.Amenities.Add(amenity);
                await this.data.SaveChangesAsync();
            }

            return amenity.Id;
        }

        public async Task<Result> Update(int id, string name)
        {
            var amenity = await this.ById(id).FirstOrDefaultAsync();

            if (amenity == null)
            {
                return $"Amenity with {id} does not exists.";
            }

            amenity.Name = name;
            await this.data.SaveChangesAsync();

            return true;
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
                return true;
            }

            return "There are other apartments using this amenity";
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
