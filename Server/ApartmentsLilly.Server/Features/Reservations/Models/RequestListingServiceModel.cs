namespace ApartmentsLilly.Server.Features.Reservations.Models
{
    using System.Globalization;
    using Data.Models.Requests;
    using Infrastructure.Mapping;
    using AutoMapper;

    public class RequestListingServiceModel : IMapFrom<Request>, IHaveCustomMappings
    {
        public int Id { get; set; }

        public string ApartmentName { get; set; }

        public string FullName { get; set; }

        public string From { get; set; }

        public string To { get; set; }

        public string Status { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<Request, RequestListingServiceModel>()
                .ForMember(r => r.FullName, opt => opt.MapFrom(r => r.FirstName + ' ' + r.LastName))
                .ForMember(a => a.ApartmentName, opt => opt.MapFrom(a => CultureInfo.CurrentCulture.TextInfo.ToTitleCase(a.Apartment.Name)))
                .ForMember(r => r.From, opt => opt.MapFrom(r => r.From.ToString("ddMMMyyyy")))
                .ForMember(r => r.To, opt => opt.MapFrom(r => r.To.ToString("ddMMMyyyy")));
        }
    }
}
