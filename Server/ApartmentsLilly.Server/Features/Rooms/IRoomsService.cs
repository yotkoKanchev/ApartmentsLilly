namespace ApartmentsLilly.Server.Features.Rooms
{
    using System.Threading.Tasks;
    using Data.Models.Rooms;
    using Infrastructure.Services;

    public interface IRoomsService
    {
        Task<Result> Create(string name, RoomType roomType, int apartmentId);
    }
}
