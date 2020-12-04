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

        public async Task<Result> Create(RoomType roomType, int apartmentId)
        {
            var isApartmentExists = await this.apartments.Exists(apartmentId);

            if (isApartmentExists == false)
            {
                return $"Apartment with Id: {apartmentId} does not exists.";
            }

            var room = new Room
            {
                RoomType = roomType,
                ApartmentId = apartmentId,
            };

            this.data.Add(room);
            await this.data.SaveChangesAsync();

            return (room.Id, true);
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

        public async Task<RoomDetailsServiceModel> GetById(string id)
        {
            return await this.ById(id)
                .To<RoomDetailsServiceModel>()
                .FirstOrDefaultAsync();
        }

        public async Task<Result> Update(string id, bool isSleepable, RoomType roomType)
        {
            var room = await this.ById(id).FirstOrDefaultAsync();

            if (room == null)
            {
                return $"Room with Id: {id} does not exists.";
            }

            room.IsSleepable = isSleepable;
            room.RoomType = roomType;

            await this.data.SaveChangesAsync();

            return true;
        }

        public async Task<Result> Delete(string id)
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

        public async Task<bool> Exists(string id)
        {
            return await this.data
                .Rooms
                .AnyAsync(a => a.Id == id);
        }

        private IQueryable<Room> ById(string id)
        {
            return this.data
                .Rooms
                .Where(r => r.Id == id);
        }
    }
}
