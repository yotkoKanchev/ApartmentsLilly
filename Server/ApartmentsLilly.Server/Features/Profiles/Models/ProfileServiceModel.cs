namespace ApartmentsLilly.Server.Features.Profiles.Models
{
    using Data.Models;
    using Infrastructure.Mapping;

    public class ProfileServiceModel : IMapFrom<Profile>
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string MainImage { get; set; }

        public string PhoneNumber { get; set; }
    }
}
