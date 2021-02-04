namespace ApartmentsLilly.Server.Features.Reservations.Models
{
    using System.Globalization;
    using Data.Models.Reservations;
    using Infrastructure.Mapping;
    using AutoMapper;

    public class ReservationListingServiceModel : IMapFrom<Reservation>, IHaveCustomMappings
    {
        public int Id { get; set; }

        public string ApartmentName { get; set; }

        public string FullName { get; set; }

        public string PhoneNumber { get; set; }

        public string Confirmation { get; set; }

        public string From { get; set; }

        public string To { get; set; }

        public string Status { get; set; }

        public string Guests { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<Reservation, ReservationListingServiceModel>()
                .ForMember(r => r.FullName, opt => opt.MapFrom(r => r.FirstName + ' ' + r.LastName))
                .ForMember(a => a.ApartmentName, opt => opt.MapFrom(a => CultureInfo.CurrentCulture.TextInfo.ToTitleCase(a.Apartment.Name)))
                .ForMember(r => r.From, opt => opt.MapFrom(r => r.From.Date.ToString("yyyy-MM-dd")))
                .ForMember(r => r.To, opt => opt.MapFrom(r => r.To.Date.ToString("yyyy-MM-dd")))
                .ForMember(r => r.Guests, opt => opt.MapFrom(r => $"{r.Adults}/{r.Children}/{r.Infants}"));
        }
    }
}
