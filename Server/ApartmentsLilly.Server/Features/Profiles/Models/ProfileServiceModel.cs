namespace ApartmentsLilly.Server.Features.Profiles.Models
{
    using Data.Models;
    using Infrastructure.Mapping;
    using System.Text.Json.Serialization;

    public class ProfileServiceModel : IMapFrom<User> 
    {
        public string UserName { get; set; }
            
        [JsonPropertyName("firstName")]
        public string ProfileFirstName { get; set; }

        [JsonPropertyName("lastName")]
        public string ProfileLastName { get; set; }

        [JsonPropertyName("mainImage")]
        public string ProfileAvatarUrl { get; set; }

        [JsonPropertyName("phoneNumber")]
        public string ProfilePhoneNumber { get; set; }

       
    }
}
