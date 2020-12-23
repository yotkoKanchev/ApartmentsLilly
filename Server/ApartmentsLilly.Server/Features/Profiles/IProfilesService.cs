namespace ApartmentsLilly.Server.Features.Profiles
{
    using System.Threading.Tasks;
    using Data.Models;
    using Infrastructure.Services;
    using Models;

    public interface IProfilesService
    {
        Task<ProfileServiceModel> ByUser(string userId);

        Task<Result> Update(string userId, string email, string firstName, string lastName, string userName, string avatarUrl, string phoneNumber);

        Task<Result> Delete(string id);
    }
}
