namespace ApartmentsLilly.Server.Features.Amenities
{
    using System.Threading.Tasks;

    public interface IAmenitiesService
    {
        Task<int> Create(string name);
    }
}
