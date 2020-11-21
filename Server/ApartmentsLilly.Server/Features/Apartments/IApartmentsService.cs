namespace ApartmentsLilly.Server.Features.Apartments
{
    using System.Threading.Tasks;
    using Infrastructure.Services;

    public interface IApartmentsService
    {
        public Task<Result> Create(string addressId, string name, string description, string entry, int? floor, string number, 
            double? size, double? basePrice, bool hasTerrace, int? maxOccupants, string mainImageUrl);
    }
}
