namespace ApartmentsLilly.Server.Features.Amenities
{
    using System.Linq;
    using System.Threading.Tasks;
    using Data;
    using Data.Models.Amenities;
    using Data.Models.Mappings;
    using Infrastructure.Services;
    using Microsoft.EntityFrameworkCore;

    public class AmenitiesService : IAmenitiesService
    {
        private readonly ApartmentsLillyDbContext data;

        public AmenitiesService(ApartmentsLillyDbContext data)
        {
            this.data = data;
        }

        public async Task<Result> Create(int? apartmentId, int? roomId, string name, int importance)
        {
            var amenityId = await this.GetIdByName(name);

            if (apartmentId.HasValue)
            {
                return await this.CreateApartmentAmenity(apartmentId.Value, amenityId, importance);
            }

            return await this.CreateRoomAmenity(roomId.Value, amenityId, importance);
        }

        public async Task<Result> Delete(int? apartmentId, int? roomId, int amenityId)
        {
            if (apartmentId.HasValue)
            {
                return await this.DeleteApartmentAmenity(apartmentId.Value, amenityId);
            }

            return await this.DeleteRoomAmenity(roomId.Value, amenityId);
        }

        private async Task<Result> CreateApartmentAmenity(int apartmentId, int amenityId, int importance)
        {
            if (await data.Apartments.AnyAsync(a => a.Id == apartmentId) == false)
            {
                return $"Apartment with Id: {apartmentId} does not exists.";
            }

            if (await this.ApartmentAmenityExists(apartmentId, amenityId) == false)
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

        private async Task<Result> CreateRoomAmenity(int roomId, int amenityId, int importance)
        {
            if (await data.Rooms.AnyAsync(a => a.Id == roomId) == false)
            {
                return $"Room with Id: {roomId} does not exists.";
            }

            if (await this.RoomAmenityExists(roomId, amenityId) == false)
            {
                var roomAmenity = new RoomAmenity
                {
                    RoomId = roomId,
                    AmenityId = amenityId,
                    Importance = (AmenityImportance)importance,
                };

                this.data.RoomAmenities.Add(roomAmenity);
                await this.data.SaveChangesAsync();

                return true;
            }
            else
            {
                return "This room has this amenity already.";
            }
        }

        private IQueryable<RoomAmenity> RoomAmenityById(int roomId, int amenityId)
        {
            return this.data
                .RoomAmenities
                .Where(ra => ra.RoomId == roomId && ra.AmenityId == amenityId);
        }

        private IQueryable<ApartmentAmenity> ApartmentAmenityById(int apartmentId, int amenityId)
        {
            return this.data
                .ApartmentAmenities
                .Where(aa => aa.ApartmentId == apartmentId && aa.AmenityId == amenityId);
        }

        private async Task<Result> DeleteRoomAmenity(int roomId, int amenityId)
        {
            var roomAmenity = await this.RoomAmenityById(roomId, amenityId).FirstOrDefaultAsync();

            if (roomAmenity == null)
            {
                return $"Amenity with ID: {amenityId} does not below to room with ID: {roomId}.";
            }

            this.data.RoomAmenities.Remove(roomAmenity);
            await data.SaveChangesAsync();
            await this.DeleteAmenity(amenityId);

            return true;
        }

        private async Task<Result> DeleteApartmentAmenity(int apartmentId, int amenityId)
        {
            var apartmentAmenity = await this.ApartmentAmenityById(apartmentId, amenityId).FirstOrDefaultAsync();

            if (apartmentAmenity == null)
            {
                return $"Amenity with ID: {amenityId} does not below to apartment with ID: {apartmentId}.";
            }

            this.data.ApartmentAmenities.Remove(apartmentAmenity);
            await data.SaveChangesAsync();

            await this.DeleteAmenity(amenityId);

            return true;
        }

        private async Task<bool> ApartmentAmenityExists(int apartmentId, int amenityId)
        {
            return await this.data.ApartmentAmenities
                .AnyAsync(aa => aa.ApartmentId == apartmentId && aa.AmenityId == amenityId);
        }

        private async Task<bool> RoomAmenityExists(int roomId, int amenityId)
        {
            return await this.data.RoomAmenities
                .AnyAsync(aa => aa.RoomId == roomId && aa.AmenityId == amenityId);
        }

        private async Task DeleteAmenity(int amenityId)
        {
            var amenity = await this.data
                .Amenities
                .FirstOrDefaultAsync(a => a.Id == amenityId);

            if (!await this.data.ApartmentAmenities.AnyAsync(aa => aa.AmenityId == amenityId) &&
                !await this.data.RoomAmenities.AnyAsync(ra => ra.AmenityId == amenityId))
            {
                this.data.Amenities.Remove(amenity);
                await data.SaveChangesAsync();
            }
        }

        private async Task<int> GetIdByName(string inputName)
        {
            var abbreviations = new string[] { "DVD", "WiFi", "AC", "PC", "TV" };

            string name = abbreviations.Contains(inputName) ? inputName : inputName.ToLower();

            var amenityId = await this.data.Amenities
                .Where(a => a.Name == name)
                .Select(a => a.Id)
                .FirstOrDefaultAsync();

            return amenityId == 0 ? await this.CreateAmenity(name) : amenityId;
        }

        private async Task<int> CreateAmenity(string name)
        {
            var amenity = new Amenity
            {
                Name = name,
            };

            await this.data.AddAsync(amenity);
            await this.data.SaveChangesAsync();

            return amenity.Id;
        }
    }
}
