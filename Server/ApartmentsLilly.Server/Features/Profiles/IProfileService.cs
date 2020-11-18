namespace ApartmentsLilly.Server.Features.Profiles
{
    using System.Threading.Tasks;
    using Data.Models;
    using Infrastructure.Services;
    using Models;

    public interface IProfileService
    {
        Task<ProfileServiceModel> ByUser(string userId);

        Task<Result> Update(
            string userId, 
            string email, 
            string firstName,
            string lastName,
            string name, 
            string mainPhotoUrl, 
            string webSite, 
            string biography, 
            Gender gender);
    }
}
