namespace ApartmentsLilly.Server.Features.Reservations.Models
{
    using System;
    using System.Globalization;
    using Data.Models.Requests;
    using Infrastructure.Mapping;
    using AutoMapper;

    using static Infrastructure.Extensions.EnumExtensions;

    public class RequestDetailsServiceModel : IMapFrom<Request>, IHaveCustomMappings
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public string AddtionalInfo { get; set; }

        public string Confirmation { get; set; }

        public DateTime From { get; set; }

        public DateTime To { get; set; }

        public int Adults { get; set; }

        public int Children { get; set; }

        public int Infants { get; set; }

        public EnumValue Status { get; set; }

        public int ApartmentId { get; set; }

        public string ApartmentName { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<Request, RequestDetailsServiceModel>()
                .ForMember(a => a.ApartmentName, opt => opt.MapFrom(a => CultureInfo.CurrentCulture.TextInfo.ToTitleCase(a.Apartment.Name)))
                .ForMember(a => a.Status, opt => opt.MapFrom(a => new EnumValue { Name = a.Status.ToString(), Value = (int)a.Status }));
        }
    }
}
