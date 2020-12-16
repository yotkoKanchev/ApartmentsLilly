namespace ApartmentsLilly.Server.Features.Rooms
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Data;
    using Data.Models.Rooms;
    using Features.Apartments;
    using Infrastructure.Services;
    using Infrastructure.Mapping;
    using Models;
    using Microsoft.EntityFrameworkCore;

    public class RoomsService : IRoomsService
    {
        private readonly ApartmentsLillyDbContext data;
        private readonly IApartmentsService apartments;

        public RoomsService(ApartmentsLillyDbContext data, IApartmentsService apartments)
        {
            this.data = data;
            this.apartments = apartments;
        }

        public async Task<Result> Create(string name, int roomType, bool isSleepable, int apartmentId)
        {
            var isApartmentExists = await this.apartments.Exists(apartmentId);

            if (isApartmentExists == false)
            {
                return $"Apartment with Id: {apartmentId} does not exists.";
            }

            var room = new Room
            {
                Name = name.ToLower(),
                RoomType = (RoomType)roomType,
                IsSleepable = isSleepable,
                ApartmentId = apartmentId,
            };

            this.data.Add(room);
            await this.data.SaveChangesAsync();

            return (room.Id);
        }

        public async Task<IEnumerable<RoomListingServiceModel>> GetAllByApartmentId(int apartmentId)
        {
            return await this.data
                .Rooms
                .Where(r => r.ApartmentId == apartmentId)
                .OrderByDescending(a => a.Beds.Count)
                .To<RoomListingServiceModel>()
                .ToListAsync();
        }

        public async Task<RoomDetailsServiceModel> GetById(int id)
        {
            var result = await this.ById(id)
                .To<RoomDetailsServiceModel>()
                .FirstOrDefaultAsync();

            result.RoomType = await this.data.Rooms
                .Where(aa => aa.Id == id)
                .Select(a => new { name = a.RoomType.ToString(), value = (int)a.RoomType })
                .FirstAsync();

            return result;
        }

        public async Task<Result> Update(int id, string name, int? roomType, bool isSleepable)
        {
            var room = await this.ById(id).FirstOrDefaultAsync();

            if (room == null)
            {
                return $"Room with Id: {id} does not exists.";
            }

            if (roomType != null)
            {
                room.RoomType = (RoomType)roomType;
            }

            room.Name = name.ToLower();
            room.IsSleepable = isSleepable;

            await this.data.SaveChangesAsync();

            return true;
        }

        public async Task<Result> Delete(int id)
        {
            var room = await this.ById(id).FirstOrDefaultAsync();

            if (room == null)
            {
                return $"Room with Id: {id} does not exists.";
            }

            this.data.Rooms.Remove(room);
            await this.data.SaveChangesAsync();

            return true;
        }

        private IQueryable<Room> ById(int id)
        {
            return this.data
                .Rooms
                .Where(r => r.Id == id);
        }
    }
}
