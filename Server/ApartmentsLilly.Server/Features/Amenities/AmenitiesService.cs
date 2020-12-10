namespace ApartmentsLilly.Server.Features.Amenities
{
    using System.Linq;
    using System.Threading.Tasks;
    using Data;
    using Data.Models.Amenities;
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
            int id;

            if (await this.Exists(name) == false)
            {
                var amenity = new Amenity
                {
                    Name = name,
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
    }
}
