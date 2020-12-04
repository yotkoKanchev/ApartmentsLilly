using System;

namespace ApartmentsLilly.Server.Features.Apartments.Models
{
    public class SearchApartmentsRequestModel
    {
        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public int Adults { get; set; }

        public int? Children { get; set; }

        public int? Infants { get; set; }
    }
}
