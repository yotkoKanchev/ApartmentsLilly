namespace ApartmentsLilly.Server.Features.Profiles.Models
{
    using System.Text.Json.Serialization;
    using Data.Models;
    using Infrastructure.Mapping;
    public class ListProfilesServiceModel : IMapFrom<User>
    {
        public string Email { get; set; }

        public string UserName { get; set; }

        [JsonPropertyName("firstName")]
        public string ProfileFirstName { get; set; }

        [JsonPropertyName("lastName")]
        public string ProfileLastName { get; set; }

        [JsonPropertyName("phoneNumber")]
        public string ProfilePhoneNumber { get; set; }

        public sbyte Role { get; set; }
    }
}
