namespace ApartmentsLilly.Server.Features.Reservations
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Data;
    using Data.Models.Requests;
    using Infrastructure.Mapping;
    using Infrastructure.Services;
    using Microsoft.EntityFrameworkCore;

    public class ReservationsService : IReservationsService
    {
        private readonly ApartmentsLillyDbContext data;

        public ReservationsService(ApartmentsLillyDbContext data)
        {
            this.data = data;
        }

        public async Task<string> Create(string userId, int apartmentId, string firstName, string lastName, string email, string phoneNumber, string additionalInfo,
            DateTime from, DateTime to, int adults, int children, int infants)
        {
            var dateHash = DateTime.UtcNow.GetHashCode().ToString();
            var confirmationCode = string.Concat(
                lastName[0..2].ToUpper(),
                from.ToString("ddMMMyy"),
                $"-D{to.Subtract(from).Days}-",
                !char.IsDigit(dateHash[0]) ? dateHash[1..] : dateHash
                );

            var request = new Request
            {
                UserId = userId,
                ApartmentId = apartmentId,
                FirstName = firstName,
                LastName = lastName,
                Email = email,
                PhoneNumber = phoneNumber,
                AdditionalInfo = additionalInfo,
                From = from,
                To = to,
                Adults = adults,
                Children = children,
                Infants = infants,
                Status = RequestStatus.Sent,
                Confirmation = confirmationCode,
            };

            await this.data.Requests.AddAsync(request);
            await this.data.SaveChangesAsync();

            return confirmationCode;
        }

        public async Task<IEnumerable<T>> GetRequests<T>(string userId)
        {
            return await this.data
                .Requests
                .Where(r => r.UserId == userId)
                .OrderByDescending(r => r.From)
                .To<T>()
                .ToListAsync();
        }

        public async Task<T> GetRequestDetails<T>(int requestId)
        {
            return await this.data
                .Requests
                .Where(r => r.Id == requestId)
                .To<T>()
                .FirstOrDefaultAsync();
        }

        public async Task<Result> CancelRequest(int requestId, string userId)
        {
            return await this.ChangeStatus(requestId, userId, RequestStatus.Canceled);
        }

        private async Task<Result> ChangeStatus(int requestId, string userId, RequestStatus newStatus)
        {
            var request = await this.data.Requests
                .FirstOrDefaultAsync(r => r.Id == requestId);

            if (request == null)
            {
                return $"Request with ID: {requestId} does not exists.";
            }

            if (request.UserId != userId)
            {
                return "You are not allowed to cancel this request.";
            }

            request.Status = RequestStatus.Canceled;
            await this.data.SaveChangesAsync();

            return true;
        }
    }
}
