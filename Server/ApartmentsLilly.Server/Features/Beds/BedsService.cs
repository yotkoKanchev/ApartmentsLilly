namespace ApartmentsLilly.Server.Features.Beds
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Data;
    using Data.Models.Beds;
    using Features.Rooms;
    using Infrastructure.Mapping;
    using Infrastructure.Services;
    using Microsoft.EntityFrameworkCore;

    public class BedsService : IBedsService
    {
        private readonly ApartmentsLillyDbContext data;
        private readonly IRoomsService rooms;

        public BedsService(ApartmentsLillyDbContext data, IRoomsService rooms)
        {
            this.data = data;
            this.rooms = rooms;
        }   

        public async Task<Result> Create(int roomId, BedType bedType)
        {
            if (!await this.rooms.Exists(roomId))
            {
                return $"Room with ID: {roomId} does not exists.";
            }

            var bed = new Bed
            {
                RoomId = roomId,
                BedType = bedType,
            };

            this.data.Beds.Add(bed);
            await this.data.SaveChangesAsync();

            return true;
        }

        public Task<T> GetById<T>(int id)
        {
            return this.ById(id)
                .To<T>()
                .FirstOrDefaultAsync();
        }

        public async Task<Result> Delete(int id)
        {
            var bed = await this.ById(id).FirstOrDefaultAsync();

            if (bed == null)
            {
                return $"Bed with ID: {id} does not exists.";
            }

            this.data.Beds.Remove(bed);
            await data.SaveChangesAsync();

            return true;
        }

        public async Task<IEnumerable<T>> GetByApartmentId<T>(int apartmentId)
        {
            return await this.data.Beds
                .Where(b => b.Room.ApartmentId == apartmentId)
                .To<T>()
                .ToListAsync();
        }

        public async Task<Result> Update(int id, BedType bedType)
        {
            var bed = await this.ById(id).FirstOrDefaultAsync();

            if (bed == null)
            {
                return $"Bed with ID: {id} does not exists.";
            }

            bed.BedType = bedType;
            await this.data.SaveChangesAsync();

            return true;
        }

        private IQueryable<Bed> ById(int id)
        {
            return this.data.Beds
                .Where(b => b.Id == id);
        }
    }
}
