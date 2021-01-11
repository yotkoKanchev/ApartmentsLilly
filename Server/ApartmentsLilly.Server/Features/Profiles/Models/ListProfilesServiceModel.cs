namespace ApartmentsLilly.Server.Features.Profiles.Models
{
    using System.Text.Json.Serialization;
    using Data.Models;
    using Infrastructure.Mapping;

    public class ListProfilesServiceModel : IMapFrom<User>
    {
        public string Id { get; set; }

        public bool isAdmin { get; set; }

        public bool isDeleted { get; set; }

        public string Email { get; set; }

        public string UserName { get; set; }

        [JsonPropertyName("firstName")]
        public string ProfileFirstName { get; set; }

        [JsonPropertyName("lastName")]
        public string ProfileLastName { get; set; }

        [JsonPropertyName("phoneNumber")]
        public string ProfilePhoneNumber { get; set; }
    }
}
