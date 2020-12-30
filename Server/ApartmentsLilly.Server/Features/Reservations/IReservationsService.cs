namespace ApartmentsLilly.Server.Features.Reservations
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Infrastructure.Services;

    public interface IReservationsService
    {
        Task<string> Create(string userId, int apartmentId, string firstName, string lastName, string email, string phoneNumber, string additionalInfo,
            DateTime from, DateTime to, int adults, int children, int infants);

        Task<IEnumerable<T>> GetRequests<T>(string userId);

        Task<T> GetRequestDetails<T>(int requestId);

        Task<Result> CancelRequest(int requestId, string userId);
    }
}
