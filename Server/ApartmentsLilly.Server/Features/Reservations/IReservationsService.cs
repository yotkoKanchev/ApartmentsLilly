namespace ApartmentsLilly.Server.Features.Reservations
{
    using System;
    using System.Threading.Tasks;

    public interface IReservationsService
    {
        Task<string> Create(string userId, string firstName, string lastName, string email, string phoneNumber, string additionalInfo,
            DateTime from, DateTime to, int adults, int children, int infants);
    }
}
