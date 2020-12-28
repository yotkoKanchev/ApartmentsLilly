namespace ApartmentsLilly.Server.Features.Reservations
{
    using System;
    using System.Threading.Tasks;
    using ApartmentsLilly.Server.Data.Models.Requests;
    using Data;

    public class ReservationsService : IReservationsService
    {
        private readonly ApartmentsLillyDbContext data;

        public ReservationsService(ApartmentsLillyDbContext data)
        {
            this.data = data;
        }
        public async Task<string> Create(string userId, string firstName, string lastName, string email, string phoneNumber, string additionalInfo,
            DateTime from, DateTime to, int adults, int children, int infants)
        {
            var confirmationCode = string.Concat(
                lastName[0..2].ToUpper(),
                from.ToString("ddMMMyy"),
                $"-D{to.Subtract(from).Days}-",
                DateTime.UtcNow.GetHashCode().ToString());

            var request = new Request
            {
                UserId = userId,
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
    }
}
