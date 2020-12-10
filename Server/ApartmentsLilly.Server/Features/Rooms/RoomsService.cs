namespace ApartmentsLilly.Server.Features.Rooms
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Data;
    using Data.Models.Mappings;
    using Data.Models.Rooms;
    using Features.Apartments;
    using Infrastructure.Services;
    using Infrastructure.Mapping;
    using Models;
    using Microsoft.EntityFrameworkCore;
    using System;

    public class RoomsService : IRoomsService
    {
        private readonly ApartmentsLillyDbContext data;
        private readonly IApartmentsService apartments;

        public RoomsService(ApartmentsLillyDbContext data, IApartmentsService apartments)
        {
            this.data = data;
            this.apartments = apartments;
        }

        public async Task<Result> Create(string name, string roomType, int apartmentId)
        {
            var isApartmentExists = await this.apartments.Exists(apartmentId);

            if (isApartmentExists == false)
            {
                return $"Apartment with Id: {apartmentId} does not exists.";
            }

            var room = new Room
            {
                Name = name,
                RoomType = (RoomType)Enum.Parse(typeof(RoomType), roomType),
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
            return await this.ById(id)
                .To<RoomDetailsServiceModel>()
                .FirstOrDefaultAsync();
        }

        public async Task<Result> Update(int id, string name, string roomType)
        {
            var room = await this.ById(id).FirstOrDefaultAsync();

            if (room == null)
            {
                return $"Room with Id: {id} does not exists.";
            }

            room.RoomType = (RoomType)Enum.Parse(typeof(RoomType), roomType);
            room.Name = name;

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

        public async Task<Result> CreateRoomAmenity(int roomId, int amenityId)
        {
            if (await this.Exists(roomId) == false)
            {
                return $"Room with Id: {roomId} does not exists.";
            }

            var roomAmenity = new RoomAmenity
            {
                RoomId = roomId,
                AmenityId = amenityId,
            };

            this.data.RoomAmenities.Add(roomAmenity);
            await this.data.SaveChangesAsync();

            return true;
        }

        private async Task<bool> Exists(int id)
        {
            return await this.data
                .Rooms
                .AnyAsync(a => a.Id == id);
        }

        private IQueryable<Room> ById(int id)
        {
            return this.data
                .Rooms
                .Where(r => r.Id == id);
        }
    }
}
