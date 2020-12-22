namespace ApartmentsLilly.Server.Features.Rooms
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Data;
    using Data.Models.Rooms;
    using Features.Apartments;
    using Features.Beds;
    using Infrastructure.Services;
    using Infrastructure.Mapping;
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
            if (!await this.apartments.Exists(apartmentId))
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

            await this.data.AddAsync(room);
            await this.data.SaveChangesAsync();

            return (room.Id);
        }

        public async Task<IEnumerable<T>> GetAllByApartmentId<T>(int apartmentId)
        {
            return await this.data
                .Rooms
                .Where(r => r.ApartmentId == apartmentId)
                .OrderByDescending(a => a.Beds.Count)
                .ThenBy(a => a.RoomType.ToString())
                .To<T>()
                .ToListAsync();
        }

        public async Task<T> GetById<T>(int id)
        {
            return await this.ById(id)
                .To<T>()
                .FirstOrDefaultAsync();
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

            if (room.IsSleepable)
            {
                var beds = await this.ById(id)
                    .SelectMany(r => r.Beds)
                    .ToListAsync();

                this.data.Beds.RemoveRange(beds);
            }

            this.data.Rooms.Remove(room);
            await this.data.SaveChangesAsync();

            return true;
        }

        public async Task<bool> Exists(int id)
        {
            return await this.data.Rooms
                .AnyAsync(r => r.Id == id);
        }

        private IQueryable<Room> ById(int id)
        {
            return this.data
                .Rooms
                .Where(r => r.Id == id);
        }
    }
}
