namespace ApartmentsLilly.Server.Features.Rooms
{
    using ApartmentsLilly.Server.Data;
    using ApartmentsLilly.Server.Features.Apartments;
    using Data.Models.Rooms;
    using Infrastructure.Services;
    using System.Threading.Tasks;

    public class RoomsService : IRoomsService
    {
        private readonly ApartmentsLillyDbContext data;
        private readonly IApartmentsService apartments;

        public RoomsService(ApartmentsLillyDbContext data, IApartmentsService apartments)
        {
            this.data = data;
            this.apartments = apartments;
        }

        public async Task<Result> Create(string name, RoomType roomType, int apartmentId)
        {
            var isApartmentExists = await this.apartments.Exists(apartmentId);

            if (isApartmentExists == false)
            {
                return $"Apartment with Id: {apartmentId} does not exists.";
            }

            var room = new Room
            {
                Name = name,
                RoomType = roomType,
                ApartmentId = apartmentId,
            };

            this.data.Add(room);
            await this.data.SaveChangesAsync();

            return (room.Id, true);
        }
    }
}
