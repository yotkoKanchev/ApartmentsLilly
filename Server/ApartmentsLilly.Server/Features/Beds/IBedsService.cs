namespace ApartmentsLilly.Server.Features.Beds
{
    using System.Threading.Tasks;
    using Data.Models.Beds;
    using Infrastructure.Services;

    public interface IBedsService
    {
        Task<Result> Create(int roomId, BedType bedType);

        Task<Result> Delete(int id);
    }
}
