namespace ApartmentsLilly.Server.Features.Reservations
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using ApartmentsLilly.Server.Infrastructure.Mapping;
    using Data;
    using Data.Models.Requests;
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
                Status = Status.Sent,
                Confirmation = confirmationCode,
            };

            await this.data.Requests.AddAsync(request);
            await this.data.SaveChangesAsync();

            return confirmationCode;
        }

        public async Task<IEnumerable<T>> GetRequests<T>(string userId)
        {
            var result = await this.data
                .Requests
                .Where(r => r.UserId == userId)
                .OrderByDescending(r => r.From)
                .To<T>()
                .ToListAsync();

            return result;
        }
    }
}
